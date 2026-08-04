export type CareerOption = {
  id: string;
  title: string;
  description: string;
  nextSteps?: CareerOption[];
  jobs?: { title: string; type: "GOVERNMENT" | "PRIVATE"; salary?: string }[];
  exams?: { title: string; eligibility: string }[];
};

export const careerPathwaysData: CareerOption[] = [
  {
    id: "after-10th",
    title: "After 10th Class",
    description: "The first major crossroads in your career. Choose a stream that aligns with your interests and strengths.",
    nextSteps: [
      {
        id: "science-mpc",
        title: "Science (MPC)",
        description: "Maths, Physics, Chemistry. Ideal for Engineering, Architecture, and technical careers.",
        nextSteps: [
          {
            id: "btech",
            title: "B.Tech / B.E.",
            description: "Bachelor of Technology/Engineering. 4-year professional course.",
            jobs: [
              { title: "Software Engineer", type: "PRIVATE", salary: "₹4L - ₹20L+" },
              { title: "Civil/Mechanical Engineer", type: "PRIVATE", salary: "₹3L - ₹10L+" },
            ],
            exams: [
              { title: "JEE Mains & Advanced", eligibility: "12th Science" },
              { title: "GATE (After B.Tech)", eligibility: "B.Tech" },
              { title: "UPSC Engineering Services", eligibility: "B.Tech" }
            ]
          },
          {
            id: "bsc-maths",
            title: "B.Sc (Mathematics/Physics)",
            description: "Bachelor of Science. 3-year academic degree focusing on core sciences.",
            jobs: [
              { title: "Data Analyst", type: "PRIVATE", salary: "₹3L - ₹8L" },
              { title: "Teacher / Lecturer", type: "PRIVATE", salary: "₹2L - ₹6L" }
            ],
            exams: [
              { title: "SSC CGL", eligibility: "Graduation" },
              { title: "UPSC CSE", eligibility: "Graduation" }
            ]
          }
        ]
      },
      {
        id: "science-bipc",
        title: "Science (BiPC)",
        description: "Biology, Physics, Chemistry. Ideal for Medicine, Pharmacy, and Agricultural sciences.",
        nextSteps: [
          {
            id: "mbbs",
            title: "MBBS",
            description: "Bachelor of Medicine, Bachelor of Surgery.",
            jobs: [
              { title: "Doctor / Medical Officer", type: "GOVERNMENT", salary: "₹6L - ₹12L+" },
              { title: "Physician", type: "PRIVATE", salary: "₹8L - ₹24L+" }
            ],
            exams: [
              { title: "NEET", eligibility: "12th Science (BiPC)" },
              { title: "UPSC CMS", eligibility: "MBBS" }
            ]
          },
          {
            id: "bpharm",
            title: "B.Pharmacy",
            description: "Bachelor of Pharmacy. Focus on pharmaceutical sciences.",
            jobs: [
              { title: "Pharmacist", type: "GOVERNMENT", salary: "₹3L - ₹6L" },
              { title: "Clinical Research Associate", type: "PRIVATE", salary: "₹3L - ₹7L" }
            ]
          }
        ]
      },
      {
        id: "commerce",
        title: "Commerce (CEC/MEC)",
        description: "Civics/Maths, Economics, Commerce. Ideal for Business, Finance, Accounting, and Management.",
        nextSteps: [
          {
            id: "bcom",
            title: "B.Com / BBA",
            description: "Bachelor of Commerce or Business Administration.",
            jobs: [
              { title: "Accountant", type: "PRIVATE", salary: "₹2L - ₹6L" },
              { title: "Financial Analyst", type: "PRIVATE", salary: "₹4L - ₹10L" }
            ],
            exams: [
              { title: "IBPS PO / Clerk", eligibility: "Graduation" },
              { title: "SSC CGL", eligibility: "Graduation" }
            ]
          },
          {
            id: "ca-cs",
            title: "CA / CS / CMA",
            description: "Professional courses in Chartered Accountancy, Company Secretary, or Cost Management.",
            jobs: [
              { title: "Chartered Accountant", type: "PRIVATE", salary: "₹8L - ₹20L+" },
              { title: "Company Secretary", type: "PRIVATE", salary: "₹6L - ₹15L+" }
            ]
          }
        ]
      },
      {
        id: "arts",
        title: "Arts & Humanities",
        description: "History, Geography, Political Science. Ideal for Civil Services, Law, Journalism, and Teaching.",
        nextSteps: [
          {
            id: "ba",
            title: "B.A. (Bachelor of Arts)",
            description: "Versatile degree offering deep knowledge in humanities.",
            jobs: [
              { title: "Content Writer", type: "PRIVATE", salary: "₹2.5L - ₹6L" },
              { title: "Public Relations Officer", type: "PRIVATE", salary: "₹3L - ₹8L" }
            ],
            exams: [
              { title: "UPSC Civil Services", eligibility: "Graduation" },
              { title: "State PSC", eligibility: "Graduation" }
            ]
          },
          {
            id: "law",
            title: "B.A. LL.B (Integrated Law)",
            description: "5-year integrated law program after 12th.",
            jobs: [
              { title: "Corporate Lawyer", type: "PRIVATE", salary: "₹5L - ₹15L+" },
              { title: "Legal Advisor", type: "GOVERNMENT", salary: "₹4L - ₹10L" }
            ],
            exams: [
              { title: "CLAT", eligibility: "12th Pass" },
              { title: "Judicial Services Exam", eligibility: "LL.B" }
            ]
          }
        ]
      },
      {
        id: "polytechnic",
        title: "Polytechnic / Diploma",
        description: "3-year practical engineering diploma right after 10th.",
        jobs: [
          { title: "Junior Engineer (JE)", type: "GOVERNMENT", salary: "₹3.5L - ₹6L" },
          { title: "Site Supervisor", type: "PRIVATE", salary: "₹2L - ₹4L" }
        ],
        exams: [
          { title: "RRB JE", eligibility: "Diploma in Engineering" },
          { title: "SSC JE", eligibility: "Diploma in Engineering" }
        ]
      },
      {
        id: "iti",
        title: "ITI (Industrial Training)",
        description: "1-2 year vocational training courses for specific trades (Electrician, Fitter, etc.).",
        jobs: [
          { title: "Technician / Loco Pilot", type: "GOVERNMENT", salary: "₹2.5L - ₹5L" },
          { title: "Mechanic / Electrician", type: "PRIVATE", salary: "₹1.5L - ₹3.5L" }
        ],
        exams: [
          { title: "RRB ALP (Assistant Loco Pilot)", eligibility: "ITI / Diploma" }
        ]
      }
    ]
  }
];

// Data for the Career Finder Quiz
export const careerFinderData = {
  educationLevels: ["10th Pass", "12th Pass", "Graduation", "Post-Graduation"],
  streams: {
    "12th Pass": ["Science (MPC)", "Science (BiPC)", "Commerce", "Arts/Humanities"],
    "Graduation": ["B.Tech/B.E.", "B.Sc", "B.Com/BBA", "B.A.", "MBBS/BDS", "LL.B", "B.Pharmacy"],
    "Post-Graduation": ["M.Tech/M.E.", "MBA", "M.Sc", "M.A.", "M.Com"]
  },
  // Simple mapping function to generate recommendations based on inputs
  getRecommendations: (education: string, stream?: string) => {
    const results = {
      government: [] as any[],
      private: [] as any[],
      exams: [] as any[]
    };

    if (education === "10th Pass") {
      results.government = [
        { title: "SSC MTS (Multi Tasking Staff)", salary: "₹18,000 - ₹22,000 / month" },
        { title: "RRB Group D", salary: "₹18,000 - ₹25,000 / month" },
        { title: "Indian Army / Navy / Airforce Tradesman", salary: "₹20,000+ / month" },
        { title: "State Police Constable (Some states)", salary: "₹20,000 - ₹25,000 / month" }
      ];
      results.private = [
        { title: "Data Entry Operator", salary: "₹10,000 - ₹15,000 / month" },
        { title: "Retail Sales Associate", salary: "₹12,000 - ₹18,000 / month" }
      ];
      results.exams = [
        { title: "SSC MTS", link: "ssc.gov.in" },
        { title: "Railway Recruitment Board (Group D)", link: "rrbcdg.gov.in" }
      ];
    } else if (education === "12th Pass") {
      results.government = [
        { title: "SSC CHSL (Clerk, Postal Assistant)", salary: "₹25,000 - ₹35,000 / month" },
        { title: "RRB NTPC (Undergraduate level)", salary: "₹25,000 - ₹35,000 / month" },
        { title: "NDA (Army/Navy/Airforce - mostly Science)", salary: "₹56,100+ / month" }
      ];
      results.private = [
        { title: "BPO / Customer Support Executive", salary: "₹15,000 - ₹25,000 / month" },
        { title: "Junior Graphic Designer / Content Creator", salary: "₹15,000 - ₹30,000 / month" }
      ];
      results.exams = [
        { title: "SSC CHSL", link: "ssc.gov.in" },
        { title: "NDA (National Defence Academy)", link: "upsc.gov.in" }
      ];
    } else if (education === "Graduation") {
      // General graduate jobs
      results.government = [
        { title: "UPSC Civil Services (IAS/IPS)", salary: "₹56,100+ / month" },
        { title: "SSC CGL (Inspector, Assistant)", salary: "₹40,000 - ₹70,000 / month" },
        { title: "IBPS/SBI Probationary Officer (PO)", salary: "₹52,000+ / month" },
        { title: "State Public Service Commission (Group 1/2)", salary: "₹40,000+ / month" }
      ];
      results.exams = [
        { title: "UPSC CSE", link: "upsc.gov.in" },
        { title: "SSC CGL", link: "ssc.gov.in" },
        { title: "IBPS PO", link: "ibps.in" }
      ];

      // Stream specific private jobs
      if (stream === "B.Tech/B.E.") {
        results.private = [
          { title: "Software Engineer", salary: "₹4L - ₹20L+ per year" },
          { title: "Data Scientist", salary: "₹6L - ₹15L+ per year" },
          { title: "Product Manager", salary: "₹8L - ₹25L+ per year" }
        ];
        results.government.push({ title: "PSU Engineer (via GATE)", salary: "₹60,000+ / month" });
        results.exams.push({ title: "GATE", link: "gate.iitk.ac.in" });
      } else if (stream === "B.Com/BBA") {
        results.private = [
          { title: "Financial Analyst", salary: "₹3L - ₹8L per year" },
          { title: "Operations/HR Executive", salary: "₹3L - ₹6L per year" }
        ];
      } else {
        results.private = [
          { title: "Digital Marketer", salary: "₹3L - ₹8L per year" },
          { title: "Business Development Executive", salary: "₹3L - ₹7L per year" },
          { title: "Content/Copy Writer", salary: "₹3L - ₹6L per year" }
        ];
      }
    } else if (education === "Post-Graduation") {
       results.government = [
        { title: "Assistant Professor (via NET)", salary: "₹57,700+ / month" },
        { title: "Specialist Officer (Banks)", salary: "₹50,000+ / month" },
        { title: "Research Scientist (Govt Labs)", salary: "₹60,000+ / month" }
      ];
      results.private = [
        { title: "Senior Consultant / Manager", salary: "₹10L - ₹30L+ per year" },
        { title: "Subject Matter Expert", salary: "₹8L - ₹15L per year" }
      ];
      results.exams = [
        { title: "UGC NET", link: "ugcnet.nta.nic.in" }
      ];
    }

    return results;
  }
};
