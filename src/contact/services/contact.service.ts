import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../models/contact.entity';
import { linkPrecedence } from '../../constants/enums';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  
  private async formatContactResponse(primaryContact?: any){
    const phoneNumbers=[];
    const emails=[];
    const secondaryContactIds=[]
    const secondaryContactDetails = await this.contactRepository.find({
      where: {linkedId: primaryContact.id},
    });

    if(primaryContact?.phoneNumber){
      phoneNumbers.push(primaryContact.phoneNumber)
    }
    if(primaryContact?.email){
      emails.push(primaryContact.email)
    }
    for(let contact of secondaryContactDetails){
      if(contact.phoneNumber && !phoneNumbers.includes(contact.phoneNumber)){
        phoneNumbers.push(contact.phoneNumber)
      }
      if(contact.email && !emails.includes(contact.email)){
        emails.push(contact.email)
      }
      secondaryContactIds.push(contact.id)
    }
    const response = {
      contact:{
        primaryContactId: primaryContact.id,
        emails: emails,
        phoneNumbers:phoneNumbers,
        secondaryContactIds
  
      }
    }
    return response;

  }
  public async addContact(body: any): Promise<any> {
    const contacts = await this.contactRepository.find({
      where: [ {email: body.email}, { phoneNumber: body.phoneNumber } ],
    });

    if(contacts.length===0){
      const newContact = {
        email: body.email ? body.email:null,
        phoneNumber: body.phoneNumber ? body.phoneNumber:null,
        linkPrecedence: linkPrecedence.PRIMARY
      }

      const contactCreated = await this.contactRepository.save(newContact);

      return this.formatContactResponse(contactCreated);
    }


    let primaryContacts = contacts.filter((contact)=> contact.linkPrecedence==='primary');
    if(primaryContacts.length==0){
      const secondaryContacts = contacts.filter((contact)=> contact.linkPrecedence==='secondary');
      primaryContacts= await this.contactRepository.find({
        where: {id: secondaryContacts[0].linkedId},
      }); 
    }



    if(primaryContacts.length==1){
      const primaryContact=primaryContacts[0];
      const secondaryContacts = await this.contactRepository.find({
        where: [ {linkedId: primaryContact.id} ],
      });

      if(secondaryContacts.length==0){
        const newContact = {
          email: body.email ? body.email:null,
          phoneNumber: body.phoneNumber ? body.phoneNumber:null,
          linkPrecedence: linkPrecedence.SECONDARY,
          linkedId:primaryContact.id
        }
      const contactCreated = await this.contactRepository.save(newContact);
      }
      return await this.formatContactResponse(primaryContact)


    }else{
      const primaryContact1 = primaryContacts[0];
      const primaryContact2 = primaryContacts[1];
      const isPrimaryContact1 = primaryContact1.createdAt<primaryContact2.createdAt?true:false;
      const id=isPrimaryContact1? primaryContact2.id:primaryContact1.id;
      const linkedId=isPrimaryContact1? primaryContact1.id:primaryContact2.id;
      const updatedContact = await this.contactRepository.update(id, {linkPrecedence:linkPrecedence.SECONDARY,linkedId});
      const contact=isPrimaryContact1?primaryContact1:primaryContact2;
      return await this.formatContactResponse(contact);
    }
  }

}
