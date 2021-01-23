import sgMail from "@sendgrid/mail";
const sendGridApiKey =
  "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";
sgMail.setApiKey(sendGridApiKey);
const msg = {
  to: "anasvakyathodi@gmail.com", // Change to your recipient
  from: "anasvakyathodi@gmail.com", // Change to your verified sender
  subject: "api testing",
  html: `<body style="background-color:grey"> 
  <table align="center" border="0" cellpadding="0" cellspacing="0" 
         width="550" bgcolor="white" style="border:2px solid black"> 
      <tbody> 
          <tr> 
              <td align="center"> 
                  <br /> 
                  <table align="center" border="0" cellpadding="0"
                         cellspacing="0" class="col-550" width="550"> 
                      <tbody> 
                          <tr>
                          <td>
                          Summa
                          </td>
                          </tr>
                      </tbody> 
                  </table> 
              </td> 
          </tr> 
      </tbody> 
  </table> 
</body>`,
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
