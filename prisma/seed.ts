import { PrismaClient, Role, ProjectStatus, ProjectStage, NotificationType, Year, WorkshopType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data in the correct order
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.session.deleteMany(),
    prisma.staticModule.deleteMany(),
    prisma.module.deleteMany(),
    prisma.approvalStatus.deleteMany(),
    prisma.soutenance.deleteMany(),
    prisma.workshop.deleteMany(),
    prisma.project.deleteMany(),
    prisma.announcement.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const commonPassword = await bcrypt.hash('123456789', 10);

  // Create project owner
  const owner = await prisma.user.create({
    data: {
      email: 'owner@esi-sba.dz',
      password: commonPassword,
      firstName: 'Project',
      lastName: 'Owner',
      role: Role.PROJECT_OWNER,
      verified: true,
      year: Year.Y3CS,
      phoneNumber: '0555123456',
      bio: 'Passionate about technology and innovation',
    },
  });

  // Create encadrant (supervisor)
  const encadrant = await prisma.user.create({
    data: {
      email: 'encadrant@esi-sba.dz',
      password: commonPassword,
      firstName: 'Dr',
      lastName: 'Supervisor',
      role: Role.SUPERVISOR,
      verified: true,
      year: Year.Y3CS,
      phoneNumber: '0555789012',
      bio: 'Professor in Software Engineering',
    },
  });

  // Create team member
  const member = await prisma.user.create({
    data: {
      email: 'member@esi-sba.dz',
      password: commonPassword,
      firstName: 'Team',
      lastName: 'Member',
      role: Role.MEMBER,
      verified: true,
      year: Year.Y2CS,
      phoneNumber: '0555345678',
      bio: 'Enthusiastic learner and team player',
    },
  });

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: 'Smart Campus Management System',
      industry: 'Education Technology',
      about: 'A comprehensive system to digitize and streamline campus operations, enhancing student and faculty experience.',
      problem: 'Current campus management processes are manual, time-consuming, and prone to errors.',
      solution: 'An integrated digital platform that automates administrative tasks, improves communication, and provides real-time insights.',
      targetAudience: 'Universities, colleges, and educational institutions',
      competitiveAdvantage: 'AI-powered analytics, seamless integration with existing systems, and user-friendly interface',
      motivation: 'Transform education management through innovative technology',
      status: ProjectStatus.PENDING,
      stage: ProjectStage.PROTOTYPE,
      owners: {
        connect: [{ id: owner.id }],
      },
      members: {
        connect: [{ id: member.id }],
      },
      encadrants: {
        connect: [{ id: encadrant.id }],
      },
      staticModules: {
        create: [
          { name: 'Research', percentage: 100 },
          { name: 'Development', percentage: 60 },
          { name: 'Testing', percentage: 30 },
          { name: 'Documentation', percentage: 45 },
        ],
      },
    },
  });

  // Create project sessions (meetings)
  const sessions = await Promise.all([
    prisma.session.create({
      data: {
        projectId: project.id,
        date: new Date('2024-03-15T14:00:00'),
        summary: 'Initial project planning and requirements gathering. Discussed main features and technical architecture.',
      },
    }),
    prisma.session.create({
      data: {
        projectId: project.id,
        date: new Date('2024-03-22T15:00:00'),
        summary: 'Review of prototype UI/UX designs. Feedback on user flow and interface improvements.',
      },
    }),
    prisma.session.create({
      data: {
        projectId: project.id,
        date: new Date('2024-03-29T14:30:00'),
        summary: 'Technical discussion on database schema and API design. Assigned development tasks.',
      },
    }),
  ]);

  // Create workshops
  const workshops = await Promise.all([
    prisma.workshop.create({
      data: {
        title: 'Modern Web Development Best Practices',
        description: 'Learn about the latest trends and best practices in web development, including React, Node.js, and TypeScript.',
        date: new Date('2024-04-05T09:00:00'),
        time: '09:00',
        type: WorkshopType.ON_SITE,
        location: 'Lab 3, ESI-SBA',
        mentor: 'Dr. Ahmed Expert',
      },
    }),
    prisma.workshop.create({
      data: {
        title: 'Agile Project Management Workshop',
        description: 'Understanding Agile methodologies and their practical application in software projects.',
        date: new Date('2024-04-12T14:00:00'),
        time: '14:00',
        type: WorkshopType.ONLINE,
        onlineLink: 'https://meet.google.com/agile-workshop',
        mentor: 'Prof. Sarah Agile',
      },
    }),
  ]);

  // Create notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        message: 'Your project proposal has been submitted for review',
        notificationType: NotificationType.GENERAL,
        userId: owner.id,
        projectId: project.id,
        isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        message: 'New session scheduled for next week',
        notificationType: NotificationType.GENERAL,
        userId: member.id,
        projectId: project.id,
        isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        message: 'Project review meeting scheduled',
        notificationType: NotificationType.GENERAL,
        userId: encadrant.id,
        projectId: project.id,
        isRead: false,
      },
    }),
  ]);

  // Create approval status
  await prisma.approvalStatus.create({
    data: {
      projectId: project.id,
      approvedById: encadrant.id,
      status: ProjectStatus.PENDING,
      token: 'demo-approval-token',
    },
  });

  console.log(`
Database seeded! 🌱

Login credentials for demo:
1. Project Owner:
   - Email: owner@esi-sba.dz
   - Password: 123456789

2. Encadrant:
   - Email: encadrant@esi-sba.dz
   - Password: 123456789

3. Team Member:
   - Email: member@esi-sba.dz
   - Password: 123456789

Project created: ${project.name}
Sessions created: ${sessions.length}
Workshops created: ${workshops.length}
`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 