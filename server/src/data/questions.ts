export const initialCashInHand = 5000
export const standardLoanInterest=0.1

export enum Impacts{
  Investment_down_20="Investment down 20%",
  Withdraw_All_Investments="Withdraw all investments",
  Penalty_5="Penalty 5%",
}

interface Option {
  option: string,
  optionText: string,
  cash: number,
  impact?:Impacts,
  loan: {
    amount: number,
    interest: number
  },
  investment: {
    amount: number,
    returns: number
  },
  rp: number,
  sp: number
}

interface Question {
  id: number,
  question: string,
  options: Option[],
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Mira’s first large order needs ₹8,000 in materials, lekin uske paas sirf ₹5,000 hain.",
    options: [
      {
        option: "A",
        optionText: "₹8,000 loan lo @10% interest.",
        cash: 0,
        loan: {
          amount: -8000,
          interest: 0.10
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 3,
        sp: 0
      },
      {
        option: "B",
        optionText: "₹5,000 cash use karo for kam items.",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 3
      }
    ]
  },
  {
    id: 2,
    question: "₹3,000 ads par spend kare ya word-of-mouth par rely kare?",
    options: [
      {
        option: "A",
        optionText: "₹3,000 ads par kharch karo.",
        cash: -3000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 2,
        sp: 1
      },
      {
        option: "B",
        optionText: "Koi ads nahi.",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      }
    ]
  },
  {
    id: 3,
    question: "Supplier 30% cheaper goods de raha hai, but returns ka risk hai.",
    options: [
      {
        option: "A",
        optionText: "Cheaper goods kharido.",
        cash: -2000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 2,
        sp: 0
      },
      {
        option: "B",
        optionText: "Ignore karo.",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      }
    ]
  },
  {
    id: 4,
    question: "Mira’s mother needs ₹6,000. Kya business funds use karna better hoga ya loan lena?",
    options: [
      {
        option: "A",
        optionText: "Business cash use karo.",
        cash: -6000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      },
      {
        option: "B",
        optionText: "₹6,000 @10% interest pe borrow karo.",
        cash: 0,
        loan: {
          amount: -6000,
          interest: 0.10
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 3,
        sp: 0
      }
    ]
  },
  {
    id: 5,
    question: "How should Mira prepare for the festive season — extra stock le ya normal production maintain kare?",
    options: [
      {
        option: "A",
        optionText: "₹5,000 ka loan lo stock ke liye.",
        cash: 2000,
        loan: {
          amount: -5000,
          interest: 0.10
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 2,
        sp: 0
      },
      {
        option: "B",
        optionText: "Jaise hai waise hi rehne do.",
        cash: 500,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      }
    ]
  },
  {
    id: 6,
    question: "There are excess returns this year. Mira ko kya karna chahiye?",
    options: [
      {
        option: "A",
        optionText: "₹1,000 mutual funds mein invest karo @14%.",
        cash: -1000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 1000,
          returns: 0.14
        },
        rp: 1,
        sp: 1
      },
      {
        option: "B",
        optionText: "Personal use ke liye paise nikaalo.",
        cash: -1000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 0
      }
    ]
  },
  {
    id: 7,
    question: "A friend needs money for an emergency. Kya Mira help kare?",
    options: [
      {
        option: "A",
        optionText: "₹4,000 dost ko udhaar do.",
        cash: -4000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 1,
        sp: 1
      },
      {
        option: "B",
        optionText: "Pyaar se mana karo.",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 3
      }
    ]
  },
  {
    id: 8,
    question: "Mira’s business is growing, aur sab kuch manage karna akeli ke liye tough ho raha hai",
    options: [
      {
        option: "A",
        optionText: "₹2,000/month pe hire karo.",
        cash: -2000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 2,
        sp: 1
      },
      {
        option: "B",
        optionText: "Akela manage karo.",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      }
    ]
  },
  {
    id: 9,
    question: "Mira received a stock market tip. Kya usse invest karna chahiye?",
    options: [
      {
        option: "A",
        optionText: "₹5,000 stock mein invest karo.",
        cash: -5000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 5000,
          returns: 0.18
        },
        rp: 3,
        sp: 0
      },
      {
        option: "B",
        optionText: "5% bank deposit pe stick raho.",
        cash: -5000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 5000,
          returns: 0.05
        },
        rp: 1,
        sp: 2
      }
    ]
  },
  {
    id: 10,
    question: "Mira ke ghar mein family wedding hai. Kya gift dena best hoga?",
    options: [
      {
        option: "A",
        optionText: "2100 ka gift",
        cash: -2100,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 1,
        sp: 1
      },
      {
        option: "B",
        optionText:"Ghar pe diner pe buloaa",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      }
    ]
  },
  {
    id: 11,
    question: "Mira bulk discount dekar stock clear kar sakti hai. Should she go for it?",
    options: [
      {
        option: "A",
        optionText: "Discount do, with big sale",
        cash: 600,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 1,
        sp: 1
      },
      {
        option: "B",
        optionText: "Regular price pe becho.",
        cash: 400,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      }
    ]
  },
  {
    id: 12,
    question: "Mira ke paas extra funds hain. Should she buy insurance or run ads to boost sales?",
    options: [
      {
        option: "A",
        optionText: "₹2,000/year ki insurance bharo.",
        cash: -2000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 2
      },
      {
        option: "B",
        optionText: "Ads chalao.",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 2,
        sp: 0
      }
    ]
  },
  {
    id: 13,
    question: "Mira apne child ki education ke liye save karna chahti hai. FD choose kare ya mutual fund mein invest kare?",
    options: [
      {
        option: "A",
        optionText: "₹5,000 FD mein daalo @6%.",
        cash: -5000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 5000,
          returns: 0.06
        },
        rp: 0,
        sp: 3
      },
      {
        option: "B",
        optionText: "Mutual funds mein invest karo @14%.",
        cash: -5000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 5000,
          returns: 0.14
        },
        rp: 2,
        sp: 0
      }
    ]
  },
  {
    id: 14,
    question: "The market has crashed. Kya Mira ab invest kare ya stability ka wait kare?",
    options: [
      {
        option: "A",
        optionText: "20% investments down",
        cash: 0,
        impact:Impacts.Investment_down_20,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 0
      },
      {
        option: "B",
        optionText: "Sara amount withdraw kro",
        cash: 0,
        impact:Impacts.Withdraw_All_Investments,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 0
      }
    ]
  },
  {
    id: 15,
    question: "Mira ke paas extra ₹10,000 hain. What should she do?",
    options: [
      {
        option: "A",
        optionText: "Loan chukaao.",
        cash: 0,
        loan: {
          amount: 10000,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 3
      },
      {
        option: "B",
        optionText: "50% loan mein do aur baaki business ke liye rakho.",
        cash: 5000,
        loan: {
          amount: 5000,
          interest: 0.00
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 3,
        sp: 0
      }
    ]
  },
  {
    id: 16,
    question: "Gold prices surge ho gaye hain. Should Mira invest now or explore other options?",
    options: [
      {
        option: "A",
        optionText: "₹5,000 gold mein invest karo.",
        cash: -5000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 5000,
          returns: 0.18
        },
        rp: 2,
        sp: 0
      },
      {
        option: "B",
        optionText: "Bank deposit pe stick raho.",
        cash: -5000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 5000,
          returns: 0.06
        },
        rp: 1,
        sp: 2
      }
    ]
  },
  {
    id: 17,
    question: "Mira ko wedding ke liye cash save karna hai. Kya woh cheaper supplier choose kare?",
    options: [
      {
        option: "A",
        optionText: "Time pe payment karo.",
        cash: -5000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 0,
        sp: 3
      },
      {
        option: "B",
        optionText: "Delay karo, 5% penalty ke saath.",
        cash: 0,
        impact:Impacts.Penalty_5,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 2,
        sp: 0
      }
    ]
  },
  {
    id: 18,
    question: "Mira’s business is facing challenges. Kya usse strategy change karni chahiye ya continue as-is?",
    options: [
      {
        option: "A",
        optionText: "Bech do.",
        cash: 200000,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 1,
        sp: 2
      },
      {
        option: "B",
        optionText: "Business rakho – mentor ki madad lo.",
        cash: 0,
        loan: {
          amount: 0,
          interest: 0.0
        },
        investment: {
          amount: 0,
          returns: 0.0
        },
        rp: 2,
        sp: 1
      }
    ]
  }
]