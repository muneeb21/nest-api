import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { contactDto } from '../../dto/contactDto';
import { ContactService } from '../services/contact.service';

@Controller('/identify')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}


  @Post()
  public async addContact(@Body() body: contactDto): Promise<any> {
    console.log('bodyyyy', body);
    if(!body.email && !body.phoneNumber){
      throw new BadRequestException(`One of the email or phone number is mandatory`)
    }
    // return body
    return await this.contactService.addContact(body);
  }

}
