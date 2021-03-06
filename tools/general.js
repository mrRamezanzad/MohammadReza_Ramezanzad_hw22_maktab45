const fs        = require('fs'),
      path      = require('path'),
      mail      = require('nodemailer')

const {mail: emailConfig} = require('../tools/manifest')

exports.removeOldFile = async (filename, callback) => {
    return new Promise(async(resolve, reject) => {
        if (filename.length) {
            try {
                let avatarExists = fs.existsSync(path.join(__dirname, "../public/images/avatars", filename))
                if (!avatarExists) return resolve(true)
                
                fs.unlinkSync(path.join(__dirname, "../public/images/avatars", filename))
                resolve(true)
                
            } catch (err) {
              reject(false)
            }
        }
    })  

}

exports.updateUserInSession = (userInSession, updatedUserInfo) => {
    
    userInSession.firstName  = updatedUserInfo.firstName
    userInSession.lastName   = updatedUserInfo.lastName
    userInSession.username   = updatedUserInfo.username
    userInSession.mobile     = updatedUserInfo.mobile
    userInSession.gender     = updatedUserInfo.gender
    userInSession.lastUpdate = updatedUserInfo.lastUpdate
}

exports.generateNewPassword = () => {return Math.random().toString(36).substr(2)}

exports.sendMail = (emailAddress, emailBody) => {
    return new Promise ((resolve, reject) => {

        let transporter = mail.createTransport({
            service: emailConfig.EMAIL_SERVICE,
            secure: true,
            auth: {
                user: emailConfig.EMAIL_ADDRESS,
                pass: emailConfig.EMAIL_PASSWORD
            }
         })
    
        let mailOptions = {
            from: emailConfig.EMAIL_ADDRESS,
            to: emailAddress,
            subject: emailBody.subject,
            html: emailBody.content
        }
    
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return reject(err)
            resolve(true)
        })
    })
}
