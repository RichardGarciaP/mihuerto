import {Edit,Globe,BookOpen,FileText,Youtube,MessageCircle,Mail,RotateCcw,DollarSign,Check,Link,Codepen} from "react-feather";


export const featuredData = [
  {
    id: 1,
    img: 'faq/1.jpg',
    date: '15 April 2023',
    writer: 'Admin',
    hits: '0',
    short_description: [' Web Designing course belongs to the field of Computer Science and IT. It enables students to learn.'],
    rvalue: 4,
    title: 'Web Design',
  },
  {
    id: 2,
    img: 'faq/2.jpg',
    date: '15 May 2023',
    writer: 'Admin',
    hits: '0',
    short_description: ['This course is designed to start you on a path toward future studies in web development and design.'],
    rvalue: 5,
    title: 'Web Development',
  },
  {
    id: 3,
    img: 'faq/3.jpg',
    date: '15 June 2023',
    writer: 'Admin',
    hits: '0',
    short_description: ['User interface design (UI) is the design for machines and software, such as mobile devices, computers.'],
    rvalue: 4,
    title: 'UI Design',
  },
  {
    id: 4,
    img: 'faq/4.jpg',
    date: '15 July 2023',
    writer: 'Admin',
    hits: '0',
    short_description: ['A Web Designing course belongs to the field of Computer Science and IT. It enables students to learn.'],
    rvalue: 3,
    title: 'Tailwind Design',
  },
];


export const askQuestionData = [
  {
    icon: <Edit />,
    title: "Tutorials",
  },
  {
    icon: <Globe />,
    title: "Help Center",
  },
  {
    icon: <BookOpen />,
    title: "Knowledgebase",
  },
  {
    icon: <FileText />,
    title: "Articles",
    class: "badge badge-primary rounded-pill pull-right",
    val: "42",
  },
  {
    icon: <Youtube />,
    title: "Video Tutorials",
    class: "badge badge-primary rounded-pill pull-right",
    val: "642",
  },
  {
    icon: <MessageCircle />,
    title: "Ask Our Community",
  },
  {
    icon: <Mail />,
    title: "Contact Us",
  },
];

export const latestData = [
  {
    iconClass: <RotateCcw className="font-primary" />,
    val: "DavidLinner",
    title: "requested money back for a double debit card charge",
    time: "10 minutes ago",
  },
  {
    iconClass: <DollarSign className="font-primary" />,
    title: "All sellers have received monthly payouts",
    time: "2 hours ago",
  },
  {
    iconClass: <Link className="font-primary" />,
    name: "UserChristopher",
    val: "Wallace",
    title: "is on hold and awaiting for staff reply",
    time: "45 minutes ago",
  },
  {
    iconClass: <Check className="font-primary" />,
    val: "Victoria Wilson",
    title: "Ticket #43683 has been closed by",
    time: "Dec 7, 11:48",
  },
];

export const articleVideoData1 = [
  {
    iconClass: <Codepen className="m-r-30" />,
    title: "Knows your sources",
    description:
      "A book giving information on many subjects or on many aspects of one subject.",
  },
  {
    iconClass: <Codepen className="m-r-30" />,
    title: "Validate website",
    description:
      "Website is the process of ensuring that the pages on the website conform.",
  },
  {
    iconClass: <Codepen className="m-r-30" />,
    title: "Sources credible/reliable",
    description:
      "Simple demos of frequently asked questions about using the Libraries and information resources",
  },
];

export const articleVideoData2 = [
  {
    iconClass: <FileText className="m-r-30" />,
    title: "Validate website",
    description:
      "Website is the process of ensuring that the pages on the website conform.",
  },
  {
    iconClass: <FileText className="m-r-30" />,
    title: "Tailwind Design",
    description:
      "Tailwind is so low-level, it never encourages you to design the same site twice.",
  },
  {
    iconClass: <FileText className="m-r-30" />,
    title: "Knows your sources",
    description:
      "A book giving information on many subjects or on many aspects of one subject.",
  },
];

export const articleVideoData3 = [
  {
    
    iconClass: <Youtube className="m-r-30" />,
    title: "Sources Demos",
    description:
      "Simple demos of frequently asked questions about using the Libraries and information resources",
  },
  {
    iconClass: <Youtube className="m-r-30" />,
    title: "Validate Html",
    description:
      "Website is the process of ensuring that the pages on the website conform.",
  },
  {
    md:true,
    iconClass: <Youtube className="m-r-30" />,
    title: "Web Design",
    description:
      "Web is so high-level, it never encourages you to design the same site twice",
  },
];
export const faqQuestionsData = [
    {
      id: 1,
      titles: [
        {
          id: 1,
          title: "Integrating WordPress with Your Website?",
          paragraph: "How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.",
        },
        {
          id: 2,
          title: "WordPress Site Maintenance ?",
          paragraph: "We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.",
        },
        {
          id: 3,
          title: "Meta Tags in WordPress ?",
          paragraph: "Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.",
        },
        {
          id: 4,
          title: "WordPress in Your Language ?",
          paragraph: "As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.",
        },
      ],
    },
    {
      id: 2,
      subTitle: "Intellectual Property",
      titles: [
        {
          id: 5,
          title: "WordPress Site Maintenance ?",
          paragraph: "We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.",
        },
        {
          id: 6,
          title: " WordPress in Your Language ?",
          paragraph: "As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.",
        },
        {
          id: 7,
          title: "Integrating WordPress with Your Website ?",
          paragraph: "How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.",
        },
      ],
    },
    {
      id: 3,
      subTitle: "Selling And Buying",
      titles: [
        {
          id: 8,
          title: "WordPress Site Maintenance ?",
          paragraph: "We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.",
        },
        {
          id: 9,
          title: "Meta Tags in WordPress ?",
          paragraph: "Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.",
        },
        {
          id: 10,
          title: "Validating a Website ?",
          paragraph: "Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.",
        },
        {
          id: 11,
          title: "Know Your Sources ?",
          paragraph: "A book or set of books giving information on many subjects or on many aspects of one subject. Some are intended as an entry point into research for a general audience, some provide detailed information.",
        },
      ],
    },
    {
      id: 4,
      subTitle: "User Accounts",
      titles: [
        {
          id: 12,
          title: "Integrating WordPress with Your Website ?",
          paragraph: "How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.",
        },
        {
          id: 13,
          title: "WordPress Site Maintenance ?",
          paragraph: "We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.",
        },
        {
          id: 14,
          title: " WordPress in Your Language ?",
          paragraph: "As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.",
        },
        {
          id: 15,
          title: " Validating a Website ?",
          paragraph: "Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.",
        },
        {
          id: 16,
          title: " Meta Tags in WordPress ?",
          paragraph: "Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.",
        },
      ],
    },
  ];