const {google} = require('googleapis');
const path = require('path')
const fs = require('fs')

const CLIENT_ID = '16768062663-i5v43pf8eu3udprak46hdqvs96ictm4l.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04AYOmjxJTAnBCgYIARAAGAQSNwF-L9IroaEjEVmJtHgc4Sqxy6QXk-10rbjeYb1dHgInfXxEL6-QL-ec3WHJNs21CmhDdSumqxw'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filepath = path.join(__dirname, 'test.jpg')


async function uploadFile() {
    try {

        const response = await drive.files.create({
            requestBody:{
                name:'test.jpg',
                mimeType: 'image/jpg'
            },
            media:{
                mimeType: 'image/jpg',
                body: fs.createReadStream(filepath)
            }
        })

        console.log(response.data);
        
    } catch (error) {
        console.log(error.message)
    }
    
} 

uploadFile();