const proxyConfig = [
  {
    context: ['/api'],
      target: 'https://pay.ttuportal.com',
  secure: true,
  changeOrigin: true
},
{
  context: ['/srms'], // Rest of other API call
    target: 'https://srms.ttuportal.com/api/student/email',
  secure: false,
  changeOrigin: true
}
];
module.exports = proxyConfig;
