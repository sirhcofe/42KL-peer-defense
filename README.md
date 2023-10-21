# 42KL Peer Defense

The first-ever 42 Kuala Lumpur internal hackathon, with a focus on innovation and problem-solving. The hackathon revolves around two central themes, each presenting exciting opportunities for creative solutions:
1. **Student Engagement:** Transform or improve student education or lifestyle on campus.
2. **Workplace Productivity:** Transform or improve BOCALs' (the staffs working at 42KL) work-life balance with automation tools, data visualization, or security.

<br/>

## Problem Statement

**Theme: Workplace Productivity**

BOCALs face two significant challenges in their operations. The first pertains to obtaining vital information about students, such as details about their ongoing projects, those projects that demand more time for completion, identifying students who require assistance, and recognizing those who may be struggling to cope with the demands of the system. Oftentimes, students require support, but due to poor time management, they end up falling through the cracks and are forced to drop out of the program.

The second challenge revolves around an event known as "Piscine Rush", designed for students during their one-month Piscine (which is a bootcamp-style trial period before entering the main program of 42KL). During this Piscine Rush, students are grouped together and assigned projects/tasks to be completed over a weekend. The challenge here is that the process of forming teams and establishing project evaluations is entirely manual, creating a repetitive and labor-intensive task for BOCALs every weekend when a Piscine occurs.

<br/>

## Solution

1. A 42 student management dashboard that aims to empower BOCALs with up-to-date student data by leveraging the 42 Network API. This enables them to better oversee and support students in their academic journey.

<div align="center" display="flex" flex-direction="column">
  <img 
      width="800"
      src="https://github.com/sirhcofe/42KL-peer-defense/assets/99158692/0accd4e1-6a64-4dd5-a10b-963681fd8c61"
  >
  <p>Student Management Dashboard</p>
</div>

<br/>

2. A Timeslot Picker designed to streamline the scheduling process for both Cadets and Pisciners. In the context of the Rush project, which culminates after the Piscine weekend, project evaluation is required to validate the work done. This evaluation involves both the Pisciner (students from the Piscine - bootcamp-style trial) and Cadet (students in the main program) groups. However, it's imperative that both parties can conveniently agree upon a suitable time for this evaluation.<br/><br/>Traditionally, this scheduling process has been managed using Google Docs or Forms, with the arduous task of manual matching handled by BOCALs. But there's a more efficient alternative – the implementation of a web-based Timeslot Picker. This innovative tool automates the scheduling process, making it easier for Cadets and Pisciners to coordinate and select evaluation times that work for everyone, eliminating the need for manual matching by BOCALs.

<div align="center" display="flex" flex-direction="column">
  <img 
      width="800"
      src="https://github.com/sirhcofe/42KL-peer-defense/assets/99158692/82eba9f5-614b-4a00-819c-1741af8241d3"
  >
  <p>Cadets view on selecting Rush evaluation time slot</p>
</div>

<div align="center" display="flex" flex-direction="column">
  <img 
      width="800"
      src="https://github.com/sirhcofe/42KL-peer-defense/assets/99158692/0011c3f4-495b-4921-b07f-768accb55df2"
  >
  <p>Pisciners view on selecting Rush evaluation time slot, where the custom timeslot picked by the Cadet is reflected on the Pisciners' view</p>
</div>

<br/>

## Technology Stack

1. Next.js - frontend
2. Firebase Firestore - database

<br/>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
