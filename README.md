# Ajay Kumar Saini Portfolio

Modern animated React portfolio for Ajay Kumar Saini, built with Vite. It includes a responsive 3D-style visual design, featured projects, live demo links, GitHub links, certificates, education, experience, and contact/social links.

## Live Links

- Portfolio: https://ajaykumarsaini.me/
- Professional Web Resume: `/resume.html`
- GitHub: https://github.com/MR-Ajay1804
- Instagram: https://www.instagram.com/the.xajju/
- LinkedIn: https://www.linkedin.com/in/ajay1804/

## Featured Projects

- Task Manager: live demo and GitHub repository
- CSV Dashboard: live demo and GitHub repository
- Library Management System: live demo and GitHub repository
- Sign Language Detection: GitHub repository
- 3D Portfolio Website: live demo
- Weed Detection System: research paper link

## Tech Stack

- React
- Vite
- JavaScript
- CSS animations
- Responsive layout

## Run Locally

```powershell
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build For Deployment

```powershell
npm run build
```

The production files will be generated in the `dist/` folder.

## Ask Ajay AI

The portfolio includes an Ask Ajay AI chatbot. It calls the Netlify function at `/api/ask-ajay`, which uses Groq from the private environment variable below:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Set this variable in Netlify site settings before deployment. Do not paste the real key into React frontend files.
