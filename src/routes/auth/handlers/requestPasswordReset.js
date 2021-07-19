const { Account } = require('../../../db/models/Account')
const { SESClient, SendTemplatedEmailCommand } = require("@aws-sdk/client-ses")
const { uuid } = require('uuidv4');

const { REGION } = require('../../../config')

const sesClient = new SESClient({ region: REGION })

module.exports = async function (req, res, next) {
    
    try {

        const {
            email
        } = req.body

        const result = await Account.findOne({ email })

        if (result) {
            
            // generate the reset password token

            const UUID = uuid()
            result.resetPasswordToken = UUID
            await result.save()
            const RESET_LINK = `https://cmdsoftware.io/resetPassword/${UUID}`

            // and send the email

            let params = {
                Destination: {
                    CcAddresses: [],
                    ToAddresses: [
                        'thadduval.lavud@gmail.com'
                    ]
                },
                Source: 'CMDSoftware.io <admin@cmdsoftware.io>',
                Template: 'CMD_GENERIC_EMAIL',
                TemplateData: `
                    { 
                        \"SUBJECT\":\"Reset Password\", 
                        \"MESSAGE_AS_TEXT\":\"Reset Password\",
                        \"GREETING\":\"Password Reset Requested\",
                        \"MESSAGE\":\"Reset Link: ${RESET_LINK}\",
                        \"ENDING\":\"Good Luck!\"
                    }
                `,
                ReplyToAddresses: [ 'no-reply@cmdsoftware.io' ],
                ConfigurationSetName: 'Email_Delivery_Status',
                Tags: [
                    {
                        Name: "BatchId",
                        Value: "CMD"
                    }
                ]
            }
    
            await sesClient.send(new SendTemplatedEmailCommand(params))
    
            res.status(200).send()

        } else res.status(404).send()
    
    } catch(e) { next(e) }

}