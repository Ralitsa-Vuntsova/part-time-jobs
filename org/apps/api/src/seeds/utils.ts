import {
  CreateJobOfferDto,
  CreateServiceOfferDto,
  CreateUserDto,
} from '@shared/data-objects';
import { Currency, Payment } from '@shared/enums';

export function getUsers(): CreateUserDto[] {
  return [
    {
      username: 'user1',
      firstName: 'User1',
      lastName: 'Testing',
      email: 'user1@example.com',
      password: '$2b$10$q/LvIqtlcyYKbUAsiku6feyyfv.jDYgSFqbSH8.dA0lNHzi2nDCpe', // Pass123@
      phoneNumber: '0888888881',
      address: 'Sofia, Bulgaria',
    },
    {
      username: 'user2',
      firstName: 'User2',
      lastName: 'TestTest',
      email: 'user2@example.com',
      password: '$2b$10$q/LvIqtlcyYKbUAsiku6feyyfv.jDYgSFqbSH8.dA0lNHzi2nDCpe', // Pass123@
      phoneNumber: '0888888882',
      address: 'Plovdiv, Bulgaria',
    },
    {
      username: 'user3',
      firstName: 'User3',
      lastName: 'TestingTesting',
      email: 'user3@example.com',
      password: '$2b$10$q/LvIqtlcyYKbUAsiku6feyyfv.jDYgSFqbSH8.dA0lNHzi2nDCpe', // Pass123@
      phoneNumber: '0888888883',
      address: 'Varna, Bulgaria',
    },
  ];
}

export function getJobOffers(): CreateJobOfferDto[] {
  return [
    {
      name: 'Dog Walking',
      description: `
        I am looking for a responsible and loving individual to look after my dogs while I’m away. My two dogs are friendly and playful, and they need someone who can provide them with attention, walks, and meals during my absence. Ideally, you would be comfortable staying at my home or visiting daily to take care of them.
        Responsibilities include:
        Feeding and giving fresh water
        Walking the dogs at least twice a day
        Providing companionship and playtime
        Ensuring the dogs are safe and secure
      `,
      dateTime: 'Next Tuesday',
      duration: '1 day',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Not needed',
      urgency: 'Not urgent',
      difficulty: 'Not difficult',
      price: {
        value: 100,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'John',
          email: 'Newton',
          phoneNumber: '0888888884',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Babysitting',
      description: `
        I am looking for a caring and responsible individual to look after my children while I’m away. My kids are well-behaved and require someone to engage them in activities and provide meals. Ideally, you would have experience with children and be able to provide a safe environment.
        Responsibilities include:
        Preparing meals
        Supervising playtime
        Helping with homework
        Ensuring the children's safety and well-being
      `,
      dateTime: 'This weekend',
      duration: '4 hours',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience with children',
      urgency: 'Urgent',
      difficulty: 'Not difficult',
      price: {
        value: 50,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Alice',
          email: 'alice@example.com',
          phoneNumber: '0881112222',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'House Cleaning',
      description: `
        I am looking for someone to clean my apartment. The tasks include dusting, vacuuming, and mopping the floors. I need a thorough cleaning of the kitchen and bathroom as well. Ideally, you should be detail-oriented and efficient.
        Responsibilities include:
        Cleaning floors, kitchen, and bathroom
        Dusting all surfaces
        Taking out the trash
      `,
      dateTime: 'Next Monday',
      duration: '2 hours',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience in cleaning',
      urgency: 'Not urgent',
      difficulty: 'Not difficult',
      price: {
        value: 80,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Peter',
          email: 'peter@example.com',
          phoneNumber: '0883334444',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Pet Sitting',
      description: `
        I am looking for a trustworthy person to take care of my pets while I’m on vacation. I have two cats and one rabbit. You would need to feed them, provide them with fresh water, and clean their litter boxes. Ideally, you would stay at my house during my absence.
        Responsibilities include:
        Feeding the pets
        Changing the litter boxes
        Ensuring the pets' safety and comfort
      `,
      dateTime: 'Next Thursday',
      duration: '3 days',
      location: 'Plovdiv, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience with pets',
      urgency: 'Not urgent',
      difficulty: 'Not difficult',
      price: {
        value: 150,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Laura',
          email: 'laura@example.com',
          phoneNumber: '0885556666',
          address: 'Plovdiv, Bulgaria',
        },
      ],
    },
    {
      name: 'Grocery Shopping',
      description: `
        I need someone to go grocery shopping for me. I have a list of items that need to be bought. Ideally, you would be familiar with the local stores and be able to provide quality items.
        Responsibilities include:
        Purchasing groceries based on the list
        Ensuring the items are fresh and of good quality
      `,
      dateTime: 'Today',
      duration: '1 hour',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'No specific qualification',
      urgency: 'Urgent',
      difficulty: 'Not difficult',
      price: {
        value: 30,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Eve',
          email: 'eve@example.com',
          phoneNumber: '0887778888',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Elderly Care',
      description: `
        I am looking for someone to take care of my elderly mother. She needs assistance with daily tasks such as eating, bathing, and getting around. Ideally, you would have experience in caregiving and be patient and compassionate.
        Responsibilities include:
        Assisting with daily tasks
        Monitoring health and safety
        Providing companionship
      `,
      dateTime: 'Next week',
      duration: '5 hours per day',
      location: 'Varna, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience in caregiving',
      urgency: 'Not urgent',
      difficulty: 'Moderate',
      price: {
        value: 120,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Mark',
          email: 'mark@example.com',
          phoneNumber: '0899999999',
          address: 'Varna, Bulgaria',
        },
      ],
    },
    {
      name: 'Event Planning',
      description: `
        I need help organizing an event for my birthday. The tasks include finding a venue, arranging catering, and coordinating with vendors. Ideally, you should have experience planning events and managing logistics.
        Responsibilities include:
        Organizing venue and catering
        Coordinating with vendors
        Managing the event on the day
      `,
      dateTime: 'Next Saturday',
      duration: '1 day',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Event planning experience',
      urgency: 'Not urgent',
      difficulty: 'Moderate',
      price: {
        value: 200,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Sandra',
          email: 'sandra@example.com',
          phoneNumber: '0881234567',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Tutoring',
      description: `
        I am looking for a tutor for my child to help with math and science. Ideally, you should have experience tutoring children and be able to explain difficult concepts in an easy-to-understand manner.
        Responsibilities include:
        Tutoring math and science
        Helping with homework and assignments
        Ensuring progress and understanding
      `,
      dateTime: 'Every Wednesday',
      duration: '2 hours',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience in tutoring',
      urgency: 'Not urgent',
      difficulty: 'Moderate',
      price: {
        value: 40,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'David',
          email: 'david@example.com',
          phoneNumber: '0881113333',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Car Washing',
      description: `
        I am looking for someone to wash my car. The task includes washing the exterior and cleaning the interior. Ideally, you should bring your own equipment and provide a high-quality service.
        Responsibilities include:
        Washing the exterior
        Cleaning the interior
        Vacuuming the seats
      `,
      dateTime: 'Tomorrow',
      duration: '1 hour',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'No specific qualification',
      urgency: 'Not urgent',
      difficulty: 'Not difficult',
      price: {
        value: 20,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Nikola',
          email: 'nikola@example.com',
          phoneNumber: '0892222333',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Personal Shopping',
      description: `
        I am looking for a personal shopper to help me buy clothes. I need assistance with choosing outfits, sizes, and finding the best deals. Ideally, you should have an eye for fashion and be able to make suggestions based on my preferences.
        Responsibilities include:
        Selecting clothing
        Ensuring the right sizes and fit
        Shopping for good deals
      `,
      dateTime: 'This weekend',
      duration: '4 hours',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Fashion knowledge',
      urgency: 'Not urgent',
      difficulty: 'Not difficult',
      price: {
        value: 70,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Tanya',
          email: 'tanya@example.com',
          phoneNumber: '0884445555',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Cat Sitting',
      description: `
        I am looking for someone who can take care of my cats while I am away. My three cats are friendly and love cuddles. I need someone to provide them with food, fresh water, and plenty of attention. Ideally, you should be comfortable visiting my home twice a day or staying overnight.
        Responsibilities include:
        Feeding and giving fresh water
        Cleaning the litter box
        Providing companionship and playtime
        Ensuring the cats are safe and secure
      `,
      dateTime: 'This weekend',
      duration: '2 days',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Not needed',
      urgency: 'Not urgent',
      difficulty: 'Not difficult',
      price: {
        value: 80,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Maria',
          email: 'maria@example.com',
          phoneNumber: '0883344556',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Pet Grooming',
      description: `
        I am looking for a professional or experienced individual to groom my dog. My dog is a medium-sized poodle and needs a bath, brushing, and trimming. The grooming should also include nail clipping and ear cleaning. If you have experience with poodles and can provide a gentle and thorough grooming session, please get in touch.
        Responsibilities include:
        Bathing and brushing
        Trimming the fur
        Nail clipping
        Ear cleaning
      `,
      dateTime: 'Next Friday',
      duration: '3 hours',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience in pet grooming preferred',
      urgency: 'Not urgent',
      difficulty: 'Moderate',
      price: {
        value: 150,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Ivan',
          email: 'ivan@example.com',
          phoneNumber: '0886778899',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'House Sitting',
      description: `
        I am looking for a responsible individual to stay in my home and take care of it while I am away. You would be responsible for ensuring the house is secure, collecting mail, watering plants, and keeping an eye on the general maintenance. This is a great opportunity for someone who enjoys a peaceful environment and can be trusted with household responsibilities.
        Responsibilities include:
        Collecting mail
        Watering plants
        Ensuring the house is secure
        Taking care of any minor maintenance tasks
      `,
      dateTime: 'In two weeks',
      duration: '4 days',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Not needed',
      urgency: 'Not urgent',
      difficulty: 'Not difficult',
      price: {
        value: 200,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Svetlana',
          email: 'svetlana@example.com',
          phoneNumber: '0881122333',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Walking Assistant for Elderly',
      description: `
        I am seeking a compassionate and responsible person to assist an elderly family member with daily walks. The person should be able to provide support while walking, ensuring safety and offering companionship. Ideally, you would accompany my relative for short walks around the neighborhood, helping with mobility and providing conversation.
        Responsibilities include:
        Assisting with walking
        Ensuring safety during walks
        Offering companionship
      `,
      dateTime: 'Every weekday morning',
      duration: '30 minutes',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience with elderly care preferred',
      urgency: 'Moderate',
      difficulty: 'Moderate',
      price: {
        value: 50,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Stefan',
          email: 'stefan@example.com',
          phoneNumber: '0882233445',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Fish Tank Cleaning',
      description: `
        I am looking for someone to clean my fish tank once a month. The tank is 200 liters and contains tropical fish. The cleaning process includes removing algae, changing water, and checking the filtration system. You must have experience with fish tank maintenance and an understanding of the care required for tropical fish.
        Responsibilities include:
        Cleaning the tank and removing algae
        Changing water and maintaining proper levels
        Checking the filtration system
      `,
      dateTime: 'Next Saturday',
      duration: '2 hours',
      location: 'Sofia, Bulgaria',
      personNumber: {
        value: 1,
        notSure: false,
      },
      qualification: 'Experience with fish tank care required',
      urgency: 'Not urgent',
      difficulty: 'Moderate',
      price: {
        value: 120,
        currency: Currency.BGN,
        payment: Payment.TotalAmount,
        byNegotiation: false,
      },
      contacts: [
        {
          name: 'Vesela',
          email: 'vesela@example.com',
          phoneNumber: '0885566778',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
  ];
}

export function getServiceOffers(): CreateServiceOfferDto[] {
  return [
    {
      name: 'Frontend Developer Intern',
      description:
        'I am actively seeking an internship opportunity where I can apply my skills in frontend development, particularly with React.js. I am eager to learn and contribute to a team focused on building user-friendly applications. I have experience in HTML, CSS, and JavaScript, and I am confident in my ability to adapt quickly. I am looking for a role that will allow me to grow and gain practical experience in building dynamic web applications.',
      contacts: [
        {
          name: 'John',
          email: 'john@example.com',
          phoneNumber: '0881234567',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Backend Developer Intern',
      description:
        'I am seeking an internship opportunity where I can apply my knowledge of backend development. I have experience with Node.js and Express.js, and I am eager to enhance my skills by working with databases like MongoDB. I am passionate about creating efficient, scalable APIs and looking to join a team that will allow me to grow and contribute to exciting projects.',
      contacts: [
        {
          name: 'Alex',
          email: 'alex@example.com',
          phoneNumber: '0887654321',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Mobile Developer Intern',
      description:
        'I am looking for an internship in mobile development to apply my knowledge of building applications for Android and iOS. I am proficient in Java and Kotlin for Android development and Swift for iOS. I am excited to learn new technologies and work with a team focused on creating innovative mobile applications.',
      contacts: [
        {
          name: 'Eva',
          email: 'eva@example.com',
          phoneNumber: '0881122334',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Data Science Intern',
      description:
        'I am actively looking for a data science internship to apply my skills in data analysis, machine learning, and data visualization. I have experience with Python and libraries like Pandas, NumPy, and Matplotlib. I am eager to learn and contribute to a team focused on analyzing data and creating actionable insights.',
      contacts: [
        {
          name: 'Daniel',
          email: 'daniel@example.com',
          phoneNumber: '0883322114',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'UI/UX Design Intern',
      description:
        'I am seeking a UI/UX design internship where I can apply my skills in designing intuitive, user-friendly interfaces. I am familiar with design tools like Figma and Adobe XD, and I am passionate about improving user experience. I am eager to contribute to a team and learn from experienced professionals in the design field.',
      contacts: [
        {
          name: 'Lina',
          email: 'lina@example.com',
          phoneNumber: '0889988776',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Quality Assurance Intern',
      description:
        'I am looking for a Quality Assurance internship where I can apply my skills in testing software and ensuring its quality. I have experience in writing test cases, performing manual testing, and using automation tools like Selenium. I am looking to contribute to a team that is focused on delivering high-quality products.',
      contacts: [
        {
          name: 'Peter',
          email: 'peter@example.com',
          phoneNumber: '0886677889',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Product Management Intern',
      description:
        'I am seeking a product management internship where I can apply my knowledge of product development and management processes. I am passionate about collaborating with teams to bring products from concept to completion. I am eager to learn about market research, product strategy, and how to manage the lifecycle of a product.',
      contacts: [
        {
          name: 'Sofia',
          email: 'sofia@example.com',
          phoneNumber: '0882211335',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Cybersecurity Intern',
      description:
        'I am actively seeking an internship in cybersecurity where I can apply my knowledge of information security practices. I have a solid foundation in network security and ethical hacking, and I am excited to work on real-world security challenges. I am eager to contribute to a team focused on protecting systems and data from potential threats.',
      contacts: [
        {
          name: 'Radoslav',
          email: 'radoslav@example.com',
          phoneNumber: '0883344556',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Cloud Computing Intern',
      description:
        'I am looking for an internship in cloud computing where I can apply my skills with cloud platforms like AWS, Google Cloud, and Azure. I am eager to learn more about cloud infrastructure, scalability, and automation while contributing to projects that leverage cloud technology.',
      contacts: [
        {
          name: 'Kristina',
          email: 'kristina@example.com',
          phoneNumber: '0882233445',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Machine Learning Intern',
      description:
        'I am seeking a machine learning internship where I can apply my knowledge in building models using frameworks like TensorFlow and PyTorch. I have experience with supervised and unsupervised learning and am eager to contribute to a team working on cutting-edge machine learning projects.',
      contacts: [
        {
          name: 'Nikolai',
          email: 'nikolai@example.com',
          phoneNumber: '0883344557',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'DevOps Intern',
      description:
        'I am looking for a DevOps internship to apply my knowledge of continuous integration and deployment, containerization, and cloud infrastructure. I am eager to learn more about automation, monitoring, and scaling systems in a real-world environment.',
      contacts: [
        {
          name: 'Dimitar',
          email: 'dimitar@example.com',
          phoneNumber: '0885566778',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Backend Developer Intern',
      description:
        'I am actively seeking an internship opportunity where I can apply my skills in backend development, particularly with Node.js and Express.js. I am eager to learn and contribute to a team focused on creating scalable and secure backend systems. I have experience in JavaScript and am confident in my ability to quickly adapt to new challenges. I am looking for a role that will allow me to develop my backend skills while working on real-world applications.',
      contacts: [
        {
          name: 'Nikolai',
          email: 'nikolai@example.com',
          phoneNumber: '0889876543',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Mobile Developer Intern',
      description:
        'I am looking for a mobile development internship where I can apply my knowledge of building Android and iOS applications using Kotlin and Swift. I am passionate about creating smooth and responsive mobile experiences, and I am excited to work with a team that values both design and functionality in mobile apps.',
      contacts: [
        {
          name: 'Elena',
          email: 'elena@example.com',
          phoneNumber: '0882233446',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'UX/UI Design Intern',
      description:
        'I am seeking an internship in UX/UI design where I can apply my skills in creating intuitive and visually appealing user interfaces. I have experience with tools like Figma and Adobe XD, and I am eager to contribute to a team that values user-centric design while learning from experienced designers.',
      contacts: [
        {
          name: 'Maya',
          email: 'maya@example.com',
          phoneNumber: '0881122334',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
    {
      name: 'Data Analyst Intern',
      description:
        'I am actively looking for a data analyst internship where I can apply my skills in data analysis, visualization, and reporting. I am experienced in using tools like Excel, Python, and Tableau, and I am eager to learn more about advanced data modeling and machine learning techniques. I am looking for an opportunity where I can contribute to data-driven decision-making and enhance my analytical skills.',
      contacts: [
        {
          name: 'Ivan',
          email: 'ivan@example.com',
          phoneNumber: '0886655443',
          address: 'Sofia, Bulgaria',
        },
      ],
    },
  ];
}
