import nodemailer from "nodemailer"
import { Command } from "commander";
import { getVariables } from "../config/config.js";

export default class Mailing{

  constructor(){
const program = new Command()
program.option('--mode <mode>', 'Modo de trabajo', 'production')
const options = program.parse()
const { mailing } = getVariables(options)

 

      this.client = nodemailer.createTransport({
        service: mailing.SERVICE,
        port: 587,
        auth :{
            user: mailing.USER,
            pass: mailing.GOOGLE_PASSWORD
        }
      }) 

    }

    sendMail = async ({from,to,subject,html,attachments = []})=>{
        const result = await this.client.sendMail({from,to,subject,html,attachments});
        return result
    }


}