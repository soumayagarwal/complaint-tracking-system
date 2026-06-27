export const seedTickets = [
  {
    id: "TKT-001",
    title: "Laptop screen flickering",
    category: "Hardware",
    priority: "High",
    description: "The laptop screen flickers intermittently while working, especially when multiple applications are open.",
    status: "Open",
    createdAt: "01 Jan, 2026",
    resolvedAt: null,
    messages: [
      {
        id: "MSG-001",
        sender: "user",
        text: "My laptop screen has started flickering since yesterday.",
        timestamp: "2026-06-01T10:05:00Z"
      },
      {
        id: "MSG-002",
        sender: "admin",
        text: "Does the flickering occur on battery power, while charging, or both?",
        timestamp: "2026-06-01T10:20:00Z"
      },
      {
        id: "MSG-003",
        sender: "user",
        text: "It happens in both cases, especially when multiple applications are open.",
        timestamp: "2026-06-01T10:35:00Z"
      },
      {
        id: "MSG-004",
        sender: "admin",
        text: "Please update the display driver and let us know if the issue persists.",
        timestamp: "2026-06-01T10:45:00Z"
      }
    ]
  },

  {
    id: "TKT-002",
    title: "Cannot login to portal",
    category: "Software",
    priority: "Medium",
    description: "Unable to access the company portal despite entering the correct credentials.",
    status: "In Progress",
    createdAt: "15 Jan, 2026",
    resolvedAt: null,
    messages: [
      {
        id: "MSG-005",
        sender: "user",
        text: "I keep getting an invalid credentials error.",
        timestamp: "2026-06-02T09:35:00Z"
      },
      {
        id: "MSG-006",
        sender: "admin",
        text: "Have you recently changed your password?",
        timestamp: "2026-06-02T09:50:00Z"
      },
      {
        id: "MSG-007",
        sender: "user",
        text: "Yes, I changed it yesterday and haven't been able to log in since.",
        timestamp: "2026-06-02T10:00:00Z"
      },
      {
        id: "MSG-008",
        sender: "admin",
        text: "We've reset your account credentials. Please try again and confirm access.",
        timestamp: "2026-06-02T10:15:00Z"
      }
    ]
  },

  {
    id: "TKT-003",
    title: "Internet disconnects frequently",
    category: "Network",
    priority: "High",
    description: "The office Wi-Fi disconnects every few minutes, interrupting work.",
    status: "Open",
    createdAt: "01 Feb, 2026",
    resolvedAt: null,
    messages: [
      // {
      //   id: "MSG-009",
      //   sender: "user",
      //   text: "The network has been unstable since morning.",
      //   timestamp: "2026-06-03T14:20:00Z"
      // },
      // {
      //   id: "MSG-010",
      //   sender: "admin",
      //   text: "Are other team members experiencing the same issue?",
      //   timestamp: "2026-06-03T14:30:00Z"
      // },
      // {
      //   id: "MSG-011",
      //   sender: "user",
      //   text: "Yes, a few colleagues nearby are also getting disconnected.",
      //   timestamp: "2026-06-03T14:40:00Z"
      // },
      // {
      //   id: "MSG-012",
      //   sender: "admin",
      //   text: "We're investigating a possible access point issue in your area.",
      //   timestamp: "2026-06-03T14:50:00Z"
      // }
    ]
  },

  {
    id: "TKT-004",
    title: "Incorrect billing amount",
    category: "Billing",
    priority: "Medium",
    description: "The latest invoice shows additional charges that were not expected.",
    status: "Resolved",
    createdAt: "15 Feb, 2026",
    resolvedAt: null,
    messages: [
      {
        id: "MSG-013",
        sender: "user",
        text: "Please check why my invoice amount is higher this month.",
        timestamp: "2026-06-04T11:10:00Z"
      },
      {
        id: "MSG-014",
        sender: "admin",
        text: "Could you share which charge seems incorrect?",
        timestamp: "2026-06-04T11:25:00Z"
      },
      {
        id: "MSG-015",
        sender: "user",
        text: "There is an additional support fee that wasn't present last month.",
        timestamp: "2026-06-04T11:35:00Z"
      },
      {
        id: "MSG-016",
        sender: "admin",
        text: "We'll review the billing records and update you shortly.",
        timestamp: "2026-06-04T11:45:00Z"
      }
    ]
  },

  {
    id: "TKT-005",
    title: "Printer not responding",
    category: "Hardware",
    priority: "Low",
    description: "The printer is powered on but does not respond to print requests.",
    status: "In Progress",
    createdAt: "09 March, 2026",
    resolvedAt: null,
    messages: [
      {
        id: "MSG-017",
        sender: "user",
        text: "The printer is showing online but nothing gets printed.",
        timestamp: "2026-06-05T08:50:00Z"
      },
      {
        id: "MSG-018",
        sender: "admin",
        text: "Are there any error lights or messages displayed on the printer?",
        timestamp: "2026-06-05T09:00:00Z"
      },
      {
        id: "MSG-019",
        sender: "user",
        text: "No errors, but print jobs remain stuck in the queue.",
        timestamp: "2026-06-05T09:10:00Z"
      },
      {
        id: "MSG-020",
        sender: "admin",
        text: "Please restart the print spooler service and try printing again.",
        timestamp: "2026-06-05T09:20:00Z"
      }
    ]
  },

  {
    id: "TKT-006",
    title: "VPN connection failed",
    category: "Network",
    priority: "High",
    description: "Unable to establish a VPN connection while working remotely.",
    status: "Open",
    createdAt: "17 March, 2026",
    resolvedAt: null,
    messages: [
      // {
      //   id: "MSG-021",
      //   sender: "user",
      //   text: "The VPN keeps timing out during connection.",
      //   timestamp: "2026-06-06T16:25:00Z"
      // },
      // {
      //   id: "MSG-022",
      //   sender: "admin",
      //   text: "Are you able to access other internet services normally?",
      //   timestamp: "2026-06-06T16:35:00Z"
      // },
      // {
      //   id: "MSG-023",
      //   sender: "user",
      //   text: "Yes, everything else is working fine.",
      //   timestamp: "2026-06-06T16:45:00Z"
      // },
      // {
      //   id: "MSG-024",
      //   sender: "admin",
      //   text: "We'll verify the VPN gateway status and get back to you.",
      //   timestamp: "2026-06-06T17:00:00Z"
      // }
    ]
  },

  {
    id: "TKT-007",
    title: "Need access to shared drive",
    category: "Other",
    priority: "Low",
    description: "Requesting access permissions for the team shared drive.",
    status: "Resolved",
    createdAt: "08 May, 2026",
    resolvedAt: null,
    messages: [
      {
        id: "MSG-025",
        sender: "user",
        text: "I cannot access the shared drive required for my project.",
        timestamp: "2026-06-07T13:45:00Z"
      },
      {
        id: "MSG-026",
        sender: "admin",
        text: "Which team folder are you trying to access?",
        timestamp: "2026-06-07T13:55:00Z"
      },
      {
        id: "MSG-027",
        sender: "user",
        text: "The Product Development shared folder.",
        timestamp: "2026-06-07T14:05:00Z"
      },
      {
        id: "MSG-028",
        sender: "admin",
        text: "We've submitted an access request to the folder owner for approval.",
        timestamp: "2026-06-07T14:15:00Z"
      }
    ]
  }
];