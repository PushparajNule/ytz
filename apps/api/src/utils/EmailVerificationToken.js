import crypto from 'crypto'

const generateEmailVerificationToken = () => {
    const token =  crypto.randomBytes(32).toString("hex")
    
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")
    
    const verificationURL = `http://localhost:8080/api/v1/auth/verify-email-change?token=${token}`

    return {token, tokenHash, verificationURL}
}

export default generateEmailVerificationToken;