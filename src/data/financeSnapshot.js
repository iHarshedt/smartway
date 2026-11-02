// Bundled verified finance records snapshot from Google Sheet
export const FALLBACK_FINANCE_ACCOUNTS = [
  {
    "id": "row-2",
    "row": 2,
    "name": "MUSTHAFA PN",
    "consumer": "1165487016684",
    "engineer": "MUHAMMEDALI",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 325500,
    "net": 250000,
    "balance": 75500,
    "formula": "250000",
    "paymentDate": "15-07-2026",
    "deliveryDate": "16/07/26",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "17/07/26"
      },
      {
        "label": "Additional date (column 13)",
        "value": "28/07/26"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-2-0",
        "index": 1,
        "value": 250000,
        "category": "receipt",
        "accountId": "row-2",
        "customer": "MUSTHAFA PN"
      }
    ],
    "received": 250000,
    "expenses": 0,
    "incomingDates": [
      "15-07-2026",
      "17/07/26",
      "28/07/26"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-3",
    "row": 3,
    "name": "ASLAM V",
    "consumer": "1165484026317",
    "engineer": "MUHAMMEDALI",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 170000,
    "balance": 26500,
    "formula": "170000",
    "paymentDate": "09.08.2026",
    "deliveryDate": "12/08/26",
    "extra": [
      {
        "label": "Additional date (column 13)",
        "value": "28/07/26"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-3-0",
        "index": 1,
        "value": 170000,
        "category": "receipt",
        "accountId": "row-3",
        "customer": "ASLAM V"
      }
    ],
    "received": 170000,
    "expenses": 0,
    "incomingDates": [
      "09.08.2026",
      "28/07/26"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-4",
    "row": 4,
    "name": "ALIBAPPU",
    "consumer": "1165576031344",
    "engineer": "NAJMUDHEEN,ANIL",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 201385,
    "balance": 97615,
    "formula": "=50000+100000+100000-5180-200-6235-25000-11000-1000",
    "paymentDate": "03-08-26/04-08-26/05-08-26",
    "deliveryDate": "10/08/26",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-4-0",
        "index": 1,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-4",
        "customer": "ALIBAPPU",
        "date": "03-08-26"
      },
      {
        "id": "row-4-1",
        "index": 2,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-4",
        "customer": "ALIBAPPU",
        "date": "04-08-26"
      },
      {
        "id": "row-4-2",
        "index": 3,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-4",
        "customer": "ALIBAPPU",
        "date": "05-08-26"
      },
      {
        "id": "row-4-3",
        "index": 4,
        "value": -5180,
        "category": "structure",
        "accountId": "row-4",
        "customer": "ALIBAPPU"
      },
      {
        "id": "row-4-4",
        "index": 5,
        "value": -200,
        "category": "agreement",
        "accountId": "row-4",
        "customer": "ALIBAPPU"
      },
      {
        "id": "row-4-5",
        "index": 6,
        "value": -6235,
        "category": "structure",
        "accountId": "row-4",
        "customer": "ALIBAPPU"
      },
      {
        "id": "row-4-6",
        "index": 7,
        "value": -25000,
        "category": "structure",
        "accountId": "row-4",
        "customer": "ALIBAPPU"
      },
      {
        "id": "row-4-7",
        "index": 8,
        "value": -11000,
        "category": "structure",
        "accountId": "row-4",
        "customer": "ALIBAPPU"
      },
      {
        "id": "row-4-8",
        "index": 9,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-4",
        "customer": "ALIBAPPU"
      }
    ],
    "received": 250000,
    "expenses": 48615,
    "incomingDates": [
      "03-08-26",
      "04-08-26",
      "05-08-26"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-5",
    "row": 5,
    "name": "MOHANAN  A",
    "consumer": "1165778031439",
    "engineer": "ANWER",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 134330,
    "balance": 80670,
    "formula": "=140000-5470-200",
    "paymentDate": "03.10.2026",
    "deliveryDate": "31/07/2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-5-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-5",
        "customer": "MOHANAN  A",
        "date": "03.10.2026"
      },
      {
        "id": "row-5-1",
        "index": 2,
        "value": -5470,
        "category": "structure",
        "accountId": "row-5",
        "customer": "MOHANAN  A"
      },
      {
        "id": "row-5-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-5",
        "customer": "MOHANAN  A"
      }
    ],
    "received": 140000,
    "expenses": 5670,
    "incomingDates": [
      "03.10.2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-6",
    "row": 6,
    "name": "VIJAYAM T V",
    "consumer": "1165458002804",
    "engineer": "MANEESH",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 140000,
    "balance": 75000,
    "formula": "140000",
    "paymentDate": "18.08.2026",
    "deliveryDate": "20/08/2026",
    "extra": [],
    "issues": [
      "Consumer number appears on multiple accounts"
    ],
    "entries": [
      {
        "id": "row-6-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-6",
        "customer": "VIJAYAM T V",
        "date": "18.08.2026"
      }
    ],
    "received": 140000,
    "expenses": 0,
    "incomingDates": [
      "18.08.2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-7",
    "row": 7,
    "name": "ABDUL RAHMAN",
    "consumer": "1168070005667",
    "engineer": "HASEENA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 175000,
    "balance": 124000,
    "formula": "=75000+25000+30000+45000",
    "paymentDate": "05-09-2026",
    "deliveryDate": "09-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-7-0",
        "index": 1,
        "value": 75000,
        "category": "receipt",
        "accountId": "row-7",
        "customer": "ABDUL RAHMAN"
      },
      {
        "id": "row-7-1",
        "index": 2,
        "value": 25000,
        "category": "receipt",
        "accountId": "row-7",
        "customer": "ABDUL RAHMAN"
      },
      {
        "id": "row-7-2",
        "index": 3,
        "value": 30000,
        "category": "receipt",
        "accountId": "row-7",
        "customer": "ABDUL RAHMAN"
      },
      {
        "id": "row-7-3",
        "index": 4,
        "value": 45000,
        "category": "receipt",
        "accountId": "row-7",
        "customer": "ABDUL RAHMAN"
      }
    ],
    "received": 175000,
    "expenses": 0,
    "incomingDates": [
      "05-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-8",
    "row": 8,
    "name": "CHERUNHIKOYA (HYBRID)",
    "consumer": "1165499029025",
    "engineer": "FAHIMA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 511068,
    "net": 490000,
    "balance": 21068,
    "formula": "490000",
    "paymentDate": "",
    "deliveryDate": "08-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-8-0",
        "index": 1,
        "value": 490000,
        "category": "receipt",
        "accountId": "row-8",
        "customer": "CHERUNHIKOYA (HYBRID)"
      }
    ],
    "received": 490000,
    "expenses": 0,
    "incomingDates": [],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-9",
    "row": 9,
    "name": "RAVIKUMAR",
    "consumer": "1167933000901",
    "engineer": "NAJIYA SUHAIB",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 136660,
    "balance": 78340,
    "formula": "=142000-4140-200-1000",
    "paymentDate": "25-08-2026",
    "deliveryDate": "31-08-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-9-0",
        "index": 1,
        "value": 142000,
        "category": "receipt",
        "accountId": "row-9",
        "customer": "RAVIKUMAR",
        "date": "25-08-2026"
      },
      {
        "id": "row-9-1",
        "index": 2,
        "value": -4140,
        "category": "structure",
        "accountId": "row-9",
        "customer": "RAVIKUMAR"
      },
      {
        "id": "row-9-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-9",
        "customer": "RAVIKUMAR"
      },
      {
        "id": "row-9-3",
        "index": 4,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-9",
        "customer": "RAVIKUMAR"
      }
    ],
    "received": 142000,
    "expenses": 5340,
    "incomingDates": [
      "25-08-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-10",
    "row": 10,
    "name": "SHIJU KRISHNAN",
    "consumer": "1167957013121",
    "engineer": "ANWAR",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 224600,
    "balance": 74400,
    "formula": "=233800-5500+5500-200-9000",
    "paymentDate": "",
    "deliveryDate": "10-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-10-0",
        "index": 1,
        "value": 233800,
        "category": "receipt",
        "accountId": "row-10",
        "customer": "SHIJU KRISHNAN"
      },
      {
        "id": "row-10-1",
        "index": 2,
        "value": -5500,
        "category": "structure",
        "accountId": "row-10",
        "customer": "SHIJU KRISHNAN"
      },
      {
        "id": "row-10-2",
        "index": 3,
        "value": 5500,
        "category": "receipt",
        "accountId": "row-10",
        "customer": "SHIJU KRISHNAN"
      },
      {
        "id": "row-10-3",
        "index": 4,
        "value": -200,
        "category": "agreement",
        "accountId": "row-10",
        "customer": "SHIJU KRISHNAN"
      },
      {
        "id": "row-10-4",
        "index": 5,
        "value": -9000,
        "category": "structure",
        "accountId": "row-10",
        "customer": "SHIJU KRISHNAN"
      }
    ],
    "received": 239300,
    "expenses": 14700,
    "incomingDates": [],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-11",
    "row": 11,
    "name": "SUNIL KUMAR",
    "consumer": "1167931000872",
    "engineer": "NAJIYA SUHAIB",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 136690,
    "balance": 78310,
    "formula": "=142000-1000-4110-200",
    "paymentDate": "11-09-2026",
    "deliveryDate": "12-09-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-11-0",
        "index": 1,
        "value": 142000,
        "category": "receipt",
        "accountId": "row-11",
        "customer": "SUNIL KUMAR",
        "date": "11-09-2026"
      },
      {
        "id": "row-11-1",
        "index": 2,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-11",
        "customer": "SUNIL KUMAR"
      },
      {
        "id": "row-11-2",
        "index": 3,
        "value": -4110,
        "category": "structure",
        "accountId": "row-11",
        "customer": "SUNIL KUMAR"
      },
      {
        "id": "row-11-3",
        "index": 4,
        "value": -200,
        "category": "agreement",
        "accountId": "row-11",
        "customer": "SUNIL KUMAR"
      }
    ],
    "received": 142000,
    "expenses": 5310,
    "incomingDates": [
      "11-09-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-12",
    "row": 12,
    "name": "MATHEW PM",
    "consumer": "1165458002804",
    "engineer": "ANWAR",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 325500,
    "net": 275300,
    "balance": 50200,
    "formula": "=22500+200000+53000-200",
    "paymentDate": "18-08-2026",
    "deliveryDate": "19-08-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review",
      "Consumer number appears on multiple accounts"
    ],
    "entries": [
      {
        "id": "row-12-0",
        "index": 1,
        "value": 22500,
        "category": "receipt",
        "accountId": "row-12",
        "customer": "MATHEW PM"
      },
      {
        "id": "row-12-1",
        "index": 2,
        "value": 200000,
        "category": "receipt",
        "accountId": "row-12",
        "customer": "MATHEW PM"
      },
      {
        "id": "row-12-2",
        "index": 3,
        "value": 53000,
        "category": "receipt",
        "accountId": "row-12",
        "customer": "MATHEW PM"
      },
      {
        "id": "row-12-3",
        "index": 4,
        "value": -200,
        "category": "agreement",
        "accountId": "row-12",
        "customer": "MATHEW PM"
      }
    ],
    "received": 275500,
    "expenses": 200,
    "incomingDates": [
      "18-08-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-13",
    "row": 13,
    "name": "ABDUL RAZAK THAYYIL",
    "consumer": "1167971005810",
    "engineer": "FAHIMA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 267000,
    "net": 118800,
    "balance": 148200,
    "formula": "=150000-200-31000",
    "paymentDate": "",
    "deliveryDate": "05-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-13-0",
        "index": 1,
        "value": 150000,
        "category": "receipt",
        "accountId": "row-13",
        "customer": "ABDUL RAZAK THAYYIL"
      },
      {
        "id": "row-13-1",
        "index": 2,
        "value": -200,
        "category": "agreement",
        "accountId": "row-13",
        "customer": "ABDUL RAZAK THAYYIL"
      },
      {
        "id": "row-13-2",
        "index": 3,
        "value": -31000,
        "category": "structure",
        "accountId": "row-13",
        "customer": "ABDUL RAZAK THAYYIL"
      }
    ],
    "received": 150000,
    "expenses": 31200,
    "incomingDates": [],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-14",
    "row": 14,
    "name": "ALI MK",
    "consumer": "1165513003040",
    "engineer": "ANAS",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 238800,
    "balance": 60200,
    "formula": "=140000+99000-200",
    "paymentDate": "",
    "deliveryDate": "09-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-14-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-14",
        "customer": "ALI MK"
      },
      {
        "id": "row-14-1",
        "index": 2,
        "value": 99000,
        "category": "receipt",
        "accountId": "row-14",
        "customer": "ALI MK"
      },
      {
        "id": "row-14-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-14",
        "customer": "ALI MK"
      }
    ],
    "received": 239000,
    "expenses": 200,
    "incomingDates": [],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-15",
    "row": 15,
    "name": "SUHRA",
    "consumer": "1167950007944",
    "engineer": "ANWER",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 141800,
    "balance": 73200,
    "formula": "=172000-30000-200",
    "paymentDate": "12-09-2026",
    "deliveryDate": "12-09-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-15-0",
        "index": 1,
        "value": 172000,
        "category": "receipt",
        "accountId": "row-15",
        "customer": "SUHRA",
        "date": "12-09-2026"
      },
      {
        "id": "row-15-1",
        "index": 2,
        "value": -30000,
        "category": "structure",
        "accountId": "row-15",
        "customer": "SUHRA"
      },
      {
        "id": "row-15-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-15",
        "customer": "SUHRA"
      }
    ],
    "received": 172000,
    "expenses": 30200,
    "incomingDates": [
      "12-09-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-16",
    "row": 16,
    "name": "JUNAIS TP",
    "consumer": "1167144022087",
    "engineer": "VINEESH VENDOR",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 219800,
    "balance": 79200,
    "formula": "=95000+95000-200+31000-1000",
    "paymentDate": "12-09-2026",
    "deliveryDate": "22-09-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "8.10.2026"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-16-0",
        "index": 1,
        "value": 95000,
        "category": "receipt",
        "accountId": "row-16",
        "customer": "JUNAIS TP"
      },
      {
        "id": "row-16-1",
        "index": 2,
        "value": 95000,
        "category": "receipt",
        "accountId": "row-16",
        "customer": "JUNAIS TP"
      },
      {
        "id": "row-16-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-16",
        "customer": "JUNAIS TP"
      },
      {
        "id": "row-16-3",
        "index": 4,
        "value": 31000,
        "category": "receipt",
        "accountId": "row-16",
        "customer": "JUNAIS TP"
      },
      {
        "id": "row-16-4",
        "index": 5,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-16",
        "customer": "JUNAIS TP"
      }
    ],
    "received": 221000,
    "expenses": 1200,
    "incomingDates": [
      "12-09-2026",
      "8.10.2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-17",
    "row": 17,
    "name": "PHILIP PS",
    "consumer": "1167136000308",
    "engineer": "DEVASSIA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 220800,
    "balance": 78200,
    "formula": "=221000-200",
    "paymentDate": "15-09-2026",
    "deliveryDate": "23-09-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-17-0",
        "index": 1,
        "value": 221000,
        "category": "receipt",
        "accountId": "row-17",
        "customer": "PHILIP PS",
        "date": "15-09-2026"
      },
      {
        "id": "row-17-1",
        "index": 2,
        "value": -200,
        "category": "agreement",
        "accountId": "row-17",
        "customer": "PHILIP PS"
      }
    ],
    "received": 221000,
    "expenses": 200,
    "incomingDates": [
      "15-09-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-18",
    "row": 18,
    "name": "ABDUL BASHEER.K",
    "consumer": "1165501018372",
    "engineer": "VINEETH VENDOR",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 114000,
    "balance": 101000,
    "formula": "=25000+25000+2000+63000-24000+23000",
    "paymentDate": "12-09-2026",
    "deliveryDate": "15-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review",
      "Consumer number appears on multiple accounts"
    ],
    "entries": [
      {
        "id": "row-18-0",
        "index": 1,
        "value": 25000,
        "category": "receipt",
        "accountId": "row-18",
        "customer": "ABDUL BASHEER.K"
      },
      {
        "id": "row-18-1",
        "index": 2,
        "value": 25000,
        "category": "receipt",
        "accountId": "row-18",
        "customer": "ABDUL BASHEER.K"
      },
      {
        "id": "row-18-2",
        "index": 3,
        "value": 2000,
        "category": "receipt",
        "accountId": "row-18",
        "customer": "ABDUL BASHEER.K"
      },
      {
        "id": "row-18-3",
        "index": 4,
        "value": 63000,
        "category": "receipt",
        "accountId": "row-18",
        "customer": "ABDUL BASHEER.K"
      },
      {
        "id": "row-18-4",
        "index": 5,
        "value": -24000,
        "category": "structure",
        "accountId": "row-18",
        "customer": "ABDUL BASHEER.K"
      },
      {
        "id": "row-18-5",
        "index": 6,
        "value": 23000,
        "category": "receipt",
        "accountId": "row-18",
        "customer": "ABDUL BASHEER.K"
      }
    ],
    "received": 138000,
    "expenses": 24000,
    "incomingDates": [
      "12-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-19",
    "row": 19,
    "name": "RAJAMMA",
    "consumer": "1165501018372",
    "engineer": "ANVAR SADATH",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 221999,
    "balance": 77001,
    "formula": "221999",
    "paymentDate": "15-09-2026",
    "deliveryDate": "23-09-2026",
    "extra": [],
    "issues": [
      "Consumer number appears on multiple accounts"
    ],
    "entries": [
      {
        "id": "row-19-0",
        "index": 1,
        "value": 221999,
        "category": "receipt",
        "accountId": "row-19",
        "customer": "RAJAMMA",
        "date": "15-09-2026"
      }
    ],
    "received": 221999,
    "expenses": 0,
    "incomingDates": [
      "15-09-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-20",
    "row": 20,
    "name": "ABDUL RAHIMAN PALAPATTA",
    "consumer": "1165519004288",
    "engineer": "ANAS",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 136732,
    "balance": 78268,
    "formula": "=99000+30000+11740-3108-200-500-200",
    "paymentDate": "15-09-2026",
    "deliveryDate": "16-09-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "30.09.2026"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-20-0",
        "index": 1,
        "value": 99000,
        "category": "receipt",
        "accountId": "row-20",
        "customer": "ABDUL RAHIMAN PALAPATTA"
      },
      {
        "id": "row-20-1",
        "index": 2,
        "value": 30000,
        "category": "receipt",
        "accountId": "row-20",
        "customer": "ABDUL RAHIMAN PALAPATTA"
      },
      {
        "id": "row-20-2",
        "index": 3,
        "value": 11740,
        "category": "receipt",
        "accountId": "row-20",
        "customer": "ABDUL RAHIMAN PALAPATTA"
      },
      {
        "id": "row-20-3",
        "index": 4,
        "value": -3108,
        "category": "structure",
        "accountId": "row-20",
        "customer": "ABDUL RAHIMAN PALAPATTA"
      },
      {
        "id": "row-20-4",
        "index": 5,
        "value": -200,
        "category": "agreement",
        "accountId": "row-20",
        "customer": "ABDUL RAHIMAN PALAPATTA"
      },
      {
        "id": "row-20-5",
        "index": 6,
        "value": -500,
        "category": "structure",
        "accountId": "row-20",
        "customer": "ABDUL RAHIMAN PALAPATTA"
      },
      {
        "id": "row-20-6",
        "index": 7,
        "value": -200,
        "category": "agreement",
        "accountId": "row-20",
        "customer": "ABDUL RAHIMAN PALAPATTA"
      }
    ],
    "received": 140740,
    "expenses": 4008,
    "incomingDates": [
      "15-09-2026",
      "30.09.2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-21",
    "row": 21,
    "name": "RAFEEK K",
    "consumer": "1165770006598",
    "engineer": "HARSHAL",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 136904,
    "balance": 78096,
    "formula": "=100000+25000-25796-200+37700+200",
    "paymentDate": "15-09-2026",
    "deliveryDate": "17-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-21-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-21",
        "customer": "RAFEEK K"
      },
      {
        "id": "row-21-1",
        "index": 2,
        "value": 25000,
        "category": "receipt",
        "accountId": "row-21",
        "customer": "RAFEEK K"
      },
      {
        "id": "row-21-2",
        "index": 3,
        "value": -25796,
        "category": "structure",
        "accountId": "row-21",
        "customer": "RAFEEK K"
      },
      {
        "id": "row-21-3",
        "index": 4,
        "value": -200,
        "category": "agreement",
        "accountId": "row-21",
        "customer": "RAFEEK K"
      },
      {
        "id": "row-21-4",
        "index": 5,
        "value": 37700,
        "category": "receipt",
        "accountId": "row-21",
        "customer": "RAFEEK K"
      },
      {
        "id": "row-21-5",
        "index": 6,
        "value": 200,
        "category": "receipt",
        "accountId": "row-21",
        "customer": "RAFEEK K"
      }
    ],
    "received": 162900,
    "expenses": 25996,
    "incomingDates": [
      "15-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-22",
    "row": 22,
    "name": "P SAIDALAVI",
    "consumer": "1165463033252",
    "engineer": "ANVAR",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 123200,
    "balance": 73300,
    "formula": "=123200+200-200",
    "paymentDate": "18-09-2026",
    "deliveryDate": "21-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-22-0",
        "index": 1,
        "value": 123200,
        "category": "receipt",
        "accountId": "row-22",
        "customer": "P SAIDALAVI"
      },
      {
        "id": "row-22-1",
        "index": 2,
        "value": 200,
        "category": "receipt",
        "accountId": "row-22",
        "customer": "P SAIDALAVI"
      },
      {
        "id": "row-22-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-22",
        "customer": "P SAIDALAVI"
      }
    ],
    "received": 123400,
    "expenses": 200,
    "incomingDates": [
      "18-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-23",
    "row": 23,
    "name": "U SUKUMARAN",
    "consumer": "1165431005723",
    "engineer": "SIJU",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 212120,
    "balance": 86880,
    "formula": "=42900+2000+48000+50000+50000+20000+7100-5180-200-1000-1500",
    "paymentDate": "22-09-2026",
    "deliveryDate": "25-09-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "23-09-2026"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-23-0",
        "index": 1,
        "value": 42900,
        "category": "receipt",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-1",
        "index": 2,
        "value": 2000,
        "category": "receipt",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-2",
        "index": 3,
        "value": 48000,
        "category": "receipt",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-3",
        "index": 4,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-4",
        "index": 5,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-5",
        "index": 6,
        "value": 20000,
        "category": "receipt",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-6",
        "index": 7,
        "value": 7100,
        "category": "receipt",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-7",
        "index": 8,
        "value": -5180,
        "category": "structure",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-8",
        "index": 9,
        "value": -200,
        "category": "agreement",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-9",
        "index": 10,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      },
      {
        "id": "row-23-10",
        "index": 11,
        "value": -1500,
        "category": "structure",
        "accountId": "row-23",
        "customer": "U SUKUMARAN"
      }
    ],
    "received": 220000,
    "expenses": 7880,
    "incomingDates": [
      "22-09-2026",
      "23-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-24",
    "row": 24,
    "name": "KUNHIMUHAMMED",
    "consumer": "1165571042775",
    "engineer": "NAJMUDHEEN,ANIL",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 325500,
    "net": 247300,
    "balance": 78200,
    "formula": "=200000-35000-200+82500",
    "paymentDate": "22-09-2026",
    "deliveryDate": "25-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-24-0",
        "index": 1,
        "value": 200000,
        "category": "receipt",
        "accountId": "row-24",
        "customer": "KUNHIMUHAMMED"
      },
      {
        "id": "row-24-1",
        "index": 2,
        "value": -35000,
        "category": "structure",
        "accountId": "row-24",
        "customer": "KUNHIMUHAMMED"
      },
      {
        "id": "row-24-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-24",
        "customer": "KUNHIMUHAMMED"
      },
      {
        "id": "row-24-3",
        "index": 4,
        "value": 82500,
        "category": "receipt",
        "accountId": "row-24",
        "customer": "KUNHIMUHAMMED"
      }
    ],
    "received": 282500,
    "expenses": 35200,
    "incomingDates": [
      "22-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-25",
    "row": 25,
    "name": "BALABHASAKARAN",
    "consumer": "1167130014269",
    "engineer": "ANVAR",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 325500,
    "net": 103600,
    "balance": 221900,
    "formula": "=50000+50000+7100-1500-2000",
    "paymentDate": "24-09-2026",
    "deliveryDate": "28-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-25-0",
        "index": 1,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-25",
        "customer": "BALABHASAKARAN"
      },
      {
        "id": "row-25-1",
        "index": 2,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-25",
        "customer": "BALABHASAKARAN"
      },
      {
        "id": "row-25-2",
        "index": 3,
        "value": 7100,
        "category": "receipt",
        "accountId": "row-25",
        "customer": "BALABHASAKARAN"
      },
      {
        "id": "row-25-3",
        "index": 4,
        "value": -1500,
        "category": "structure",
        "accountId": "row-25",
        "customer": "BALABHASAKARAN"
      },
      {
        "id": "row-25-4",
        "index": 5,
        "value": -2000,
        "category": "structure",
        "accountId": "row-25",
        "customer": "BALABHASAKARAN"
      }
    ],
    "received": 107100,
    "expenses": 3500,
    "incomingDates": [
      "24-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-26",
    "row": 26,
    "name": "NARAYANAN KUTTY",
    "consumer": "1165583015446",
    "engineer": "VIJESH",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 139800,
    "balance": 75200,
    "formula": "=140000+200-400",
    "paymentDate": "24-09-2026",
    "deliveryDate": "30-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-26-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-26",
        "customer": "NARAYANAN KUTTY"
      },
      {
        "id": "row-26-1",
        "index": 2,
        "value": 200,
        "category": "receipt",
        "accountId": "row-26",
        "customer": "NARAYANAN KUTTY"
      },
      {
        "id": "row-26-2",
        "index": 3,
        "value": -400,
        "category": "agreement",
        "accountId": "row-26",
        "customer": "NARAYANAN KUTTY"
      }
    ],
    "received": 140200,
    "expenses": 400,
    "incomingDates": [
      "24-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-27",
    "row": 27,
    "name": "SANTHOSH BABU MP",
    "consumer": "1165617016191",
    "engineer": "ANAS",
    "capacity": 5.25,
    "structure": "TABLE TYPE",
    "bill": 329000,
    "net": 129000,
    "balance": 200000,
    "formula": "=139000-400-9600",
    "paymentDate": "24-09-2026",
    "deliveryDate": "29-09-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-27-0",
        "index": 1,
        "value": 139000,
        "category": "receipt",
        "accountId": "row-27",
        "customer": "SANTHOSH BABU MP",
        "date": "24-09-2026"
      },
      {
        "id": "row-27-1",
        "index": 2,
        "value": -400,
        "category": "agreement",
        "accountId": "row-27",
        "customer": "SANTHOSH BABU MP"
      },
      {
        "id": "row-27-2",
        "index": 3,
        "value": -9600,
        "category": "structure",
        "accountId": "row-27",
        "customer": "SANTHOSH BABU MP"
      }
    ],
    "received": 139000,
    "expenses": 10000,
    "incomingDates": [
      "24-09-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-28",
    "row": 28,
    "name": "FRANCIS MJ",
    "consumer": "1165431023491",
    "engineer": "JULIYA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 239000,
    "balance": 60000,
    "formula": "=140000+99000",
    "paymentDate": "24-09-2026",
    "deliveryDate": "28-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-28-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-28",
        "customer": "FRANCIS MJ"
      },
      {
        "id": "row-28-1",
        "index": 2,
        "value": 99000,
        "category": "receipt",
        "accountId": "row-28",
        "customer": "FRANCIS MJ"
      }
    ],
    "received": 239000,
    "expenses": 0,
    "incomingDates": [
      "24-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-29",
    "row": 29,
    "name": "DR.JALEEL KK",
    "consumer": "1165959038136",
    "engineer": "ASHFAQ VENDOR",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 514335,
    "net": 200000,
    "balance": 314335,
    "formula": "=90000+95000+15000",
    "paymentDate": "24-09-2026",
    "deliveryDate": "07-10-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-29-0",
        "index": 1,
        "value": 90000,
        "category": "receipt",
        "accountId": "row-29",
        "customer": "DR.JALEEL KK"
      },
      {
        "id": "row-29-1",
        "index": 2,
        "value": 95000,
        "category": "receipt",
        "accountId": "row-29",
        "customer": "DR.JALEEL KK"
      },
      {
        "id": "row-29-2",
        "index": 3,
        "value": 15000,
        "category": "receipt",
        "accountId": "row-29",
        "customer": "DR.JALEEL KK"
      }
    ],
    "received": 200000,
    "expenses": 0,
    "incomingDates": [
      "24-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-30",
    "row": 30,
    "name": "ABDUL RASAC",
    "consumer": "1165456021619",
    "engineer": "ANAS",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 155000,
    "balance": 60000,
    "formula": "=140000+15000",
    "paymentDate": "25-09-2026",
    "deliveryDate": "30-09-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-30-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-30",
        "customer": "ABDUL RASAC"
      },
      {
        "id": "row-30-1",
        "index": 2,
        "value": 15000,
        "category": "receipt",
        "accountId": "row-30",
        "customer": "ABDUL RASAC"
      }
    ],
    "received": 155000,
    "expenses": 0,
    "incomingDates": [
      "25-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-31",
    "row": 31,
    "name": "JOSE K",
    "consumer": "1167934002336",
    "engineer": "ANIL",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 130000,
    "balance": 85000,
    "formula": "=60000+50000+20000",
    "paymentDate": "26-09-2026",
    "deliveryDate": "06-10-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-31-0",
        "index": 1,
        "value": 60000,
        "category": "receipt",
        "accountId": "row-31",
        "customer": "JOSE K"
      },
      {
        "id": "row-31-1",
        "index": 2,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-31",
        "customer": "JOSE K"
      },
      {
        "id": "row-31-2",
        "index": 3,
        "value": 20000,
        "category": "receipt",
        "accountId": "row-31",
        "customer": "JOSE K"
      }
    ],
    "received": 130000,
    "expenses": 0,
    "incomingDates": [
      "26-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-32",
    "row": 32,
    "name": "AYITHUTTY",
    "consumer": "1165510001123",
    "engineer": "JUNAID",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 119800,
    "balance": 95200,
    "formula": "=80000+40000-200",
    "paymentDate": "27-09-2026",
    "deliveryDate": "06-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "12-10-2026"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-32-0",
        "index": 1,
        "value": 80000,
        "category": "receipt",
        "accountId": "row-32",
        "customer": "AYITHUTTY",
        "date": "27-09-2026"
      },
      {
        "id": "row-32-1",
        "index": 2,
        "value": 40000,
        "category": "receipt",
        "accountId": "row-32",
        "customer": "AYITHUTTY",
        "date": "12-10-2026"
      },
      {
        "id": "row-32-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-32",
        "customer": "AYITHUTTY"
      }
    ],
    "received": 120000,
    "expenses": 200,
    "incomingDates": [
      "27-09-2026",
      "12-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-33",
    "row": 33,
    "name": "JAMAL NALLAKATH",
    "consumer": "1165837035672",
    "engineer": "ASHFAQ/NAJMUDHEEN",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 174800,
    "balance": 40200,
    "formula": "=95000+110000-30000-200",
    "paymentDate": "27-09-2026",
    "deliveryDate": "07-10-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-33-0",
        "index": 1,
        "value": 95000,
        "category": "receipt",
        "accountId": "row-33",
        "customer": "JAMAL NALLAKATH"
      },
      {
        "id": "row-33-1",
        "index": 2,
        "value": 110000,
        "category": "receipt",
        "accountId": "row-33",
        "customer": "JAMAL NALLAKATH"
      },
      {
        "id": "row-33-2",
        "index": 3,
        "value": -30000,
        "category": "structure",
        "accountId": "row-33",
        "customer": "JAMAL NALLAKATH"
      },
      {
        "id": "row-33-3",
        "index": 4,
        "value": -200,
        "category": "agreement",
        "accountId": "row-33",
        "customer": "JAMAL NALLAKATH"
      }
    ],
    "received": 205000,
    "expenses": 30200,
    "incomingDates": [
      "27-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-34",
    "row": 34,
    "name": "MUHAMMED RAFEEK",
    "consumer": "1165632034947",
    "engineer": "NAJMUDHEEN,ANIL",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 239600,
    "balance": 59400,
    "formula": "=140000+80000+20000-400",
    "paymentDate": "27-09-2026",
    "deliveryDate": "07-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "13-10-2026"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-34-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-34",
        "customer": "MUHAMMED RAFEEK"
      },
      {
        "id": "row-34-1",
        "index": 2,
        "value": 80000,
        "category": "receipt",
        "accountId": "row-34",
        "customer": "MUHAMMED RAFEEK"
      },
      {
        "id": "row-34-2",
        "index": 3,
        "value": 20000,
        "category": "receipt",
        "accountId": "row-34",
        "customer": "MUHAMMED RAFEEK"
      },
      {
        "id": "row-34-3",
        "index": 4,
        "value": -400,
        "category": "agreement",
        "accountId": "row-34",
        "customer": "MUHAMMED RAFEEK"
      }
    ],
    "received": 240000,
    "expenses": 400,
    "incomingDates": [
      "27-09-2026",
      "13-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-35",
    "row": 35,
    "name": "VALSA",
    "consumer": "1165456019401",
    "engineer": "PRADEEP VENDOR",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 136800,
    "balance": 78200,
    "formula": "=100000+37000-200",
    "paymentDate": "29-09-2026",
    "deliveryDate": "06-10-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-35-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-35",
        "customer": "VALSA"
      },
      {
        "id": "row-35-1",
        "index": 2,
        "value": 37000,
        "category": "receipt",
        "accountId": "row-35",
        "customer": "VALSA"
      },
      {
        "id": "row-35-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-35",
        "customer": "VALSA"
      }
    ],
    "received": 137000,
    "expenses": 200,
    "incomingDates": [
      "29-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-36",
    "row": 36,
    "name": "GEORGE KALIKAV",
    "consumer": "1165608023656",
    "engineer": "NAJMUDHEEN,ANIL",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 248600,
    "balance": 50400,
    "formula": "= 150000-400+99000",
    "paymentDate": "29-09-2026",
    "deliveryDate": "07-10-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-36-0",
        "index": 1,
        "value": 150000,
        "category": "receipt",
        "accountId": "row-36",
        "customer": "GEORGE KALIKAV"
      },
      {
        "id": "row-36-1",
        "index": 2,
        "value": -400,
        "category": "agreement",
        "accountId": "row-36",
        "customer": "GEORGE KALIKAV"
      },
      {
        "id": "row-36-2",
        "index": 3,
        "value": 99000,
        "category": "receipt",
        "accountId": "row-36",
        "customer": "GEORGE KALIKAV"
      }
    ],
    "received": 249000,
    "expenses": 400,
    "incomingDates": [
      "29-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-37",
    "row": 37,
    "name": "NISHAD A",
    "consumer": "1165502029553",
    "engineer": "VINEETH",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 325500,
    "net": 300000,
    "balance": 25500,
    "formula": "=100000+200000",
    "paymentDate": "30-09-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-37-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-37",
        "customer": "NISHAD A"
      },
      {
        "id": "row-37-1",
        "index": 2,
        "value": 200000,
        "category": "receipt",
        "accountId": "row-37",
        "customer": "NISHAD A"
      }
    ],
    "received": 300000,
    "expenses": 0,
    "incomingDates": [
      "30-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-38",
    "row": 38,
    "name": "MOYIN KUTTY",
    "consumer": "1165503019509",
    "engineer": "HAMEED VENDOR",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 136656,
    "balance": 78344,
    "formula": "=80000-200-1000-4144+62000",
    "paymentDate": "30-09-2026",
    "deliveryDate": "06-10-2026",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-38-0",
        "index": 1,
        "value": 80000,
        "category": "receipt",
        "accountId": "row-38",
        "customer": "MOYIN KUTTY"
      },
      {
        "id": "row-38-1",
        "index": 2,
        "value": -200,
        "category": "agreement",
        "accountId": "row-38",
        "customer": "MOYIN KUTTY"
      },
      {
        "id": "row-38-2",
        "index": 3,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-38",
        "customer": "MOYIN KUTTY"
      },
      {
        "id": "row-38-3",
        "index": 4,
        "value": -4144,
        "category": "registration",
        "accountId": "row-38",
        "customer": "MOYIN KUTTY"
      },
      {
        "id": "row-38-4",
        "index": 5,
        "value": 62000,
        "category": "receipt",
        "accountId": "row-38",
        "customer": "MOYIN KUTTY"
      }
    ],
    "received": 142000,
    "expenses": 5344,
    "incomingDates": [
      "30-09-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-39",
    "row": 39,
    "name": "MOHANDAS",
    "consumer": "1167958005201",
    "engineer": "ANVAR",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 218000,
    "net": 140000,
    "balance": 78000,
    "formula": "=140000",
    "paymentDate": "23-10-2026",
    "deliveryDate": "06-10-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-39-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-39",
        "customer": "MOHANDAS",
        "date": "23-10-2026"
      }
    ],
    "received": 140000,
    "expenses": 0,
    "incomingDates": [
      "23-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-40",
    "row": 40,
    "name": "RAJU K",
    "consumer": "1166359025870",
    "engineer": "ANAS",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 229000,
    "balance": 70000,
    "formula": "=49000+50000+130000",
    "paymentDate": "01-10-2026",
    "deliveryDate": "16-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-40-0",
        "index": 1,
        "value": 49000,
        "category": "receipt",
        "accountId": "row-40",
        "customer": "RAJU K"
      },
      {
        "id": "row-40-1",
        "index": 2,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-40",
        "customer": "RAJU K"
      },
      {
        "id": "row-40-2",
        "index": 3,
        "value": 130000,
        "category": "receipt",
        "accountId": "row-40",
        "customer": "RAJU K"
      }
    ],
    "received": 229000,
    "expenses": 0,
    "incomingDates": [
      "01-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-41",
    "row": 41,
    "name": "HARIKRISHNAN P",
    "consumer": "1165607028224",
    "engineer": "JUNAID",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 304200,
    "net": 173144,
    "balance": 131056,
    "formula": "=50000+123144",
    "paymentDate": "01-10-2026",
    "deliveryDate": "28-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-41-0",
        "index": 1,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-41",
        "customer": "HARIKRISHNAN P"
      },
      {
        "id": "row-41-1",
        "index": 2,
        "value": 123144,
        "category": "receipt",
        "accountId": "row-41",
        "customer": "HARIKRISHNAN P"
      }
    ],
    "received": 173144,
    "expenses": 0,
    "incomingDates": [
      "01-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-42",
    "row": 42,
    "name": "SHANAVAS KHAN VP",
    "consumer": "1165484027707",
    "engineer": "JUNAID",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 136800,
    "balance": 78200,
    "formula": "=25000+100000-200+12000",
    "paymentDate": "01-10-2026",
    "deliveryDate": "14-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "14-10-2026"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-42-0",
        "index": 1,
        "value": 25000,
        "category": "receipt",
        "accountId": "row-42",
        "customer": "SHANAVAS KHAN VP"
      },
      {
        "id": "row-42-1",
        "index": 2,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-42",
        "customer": "SHANAVAS KHAN VP"
      },
      {
        "id": "row-42-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-42",
        "customer": "SHANAVAS KHAN VP"
      },
      {
        "id": "row-42-3",
        "index": 4,
        "value": 12000,
        "category": "receipt",
        "accountId": "row-42",
        "customer": "SHANAVAS KHAN VP"
      }
    ],
    "received": 137000,
    "expenses": 200,
    "incomingDates": [
      "01-10-2026",
      "14-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-43",
    "row": 43,
    "name": "SIBIN ISAC",
    "consumer": "1165447042915",
    "engineer": "SHARAFALI",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 137000,
    "balance": 78000,
    "formula": "=70000+30000-200+37200+4140-4140",
    "paymentDate": "02-10-2026",
    "deliveryDate": "16-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "17-10-2026"
      },
      {
        "label": "Additional date (column 13)",
        "value": "21-10-2026"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-43-0",
        "index": 1,
        "value": 70000,
        "category": "receipt",
        "accountId": "row-43",
        "customer": "SIBIN ISAC"
      },
      {
        "id": "row-43-1",
        "index": 2,
        "value": 30000,
        "category": "receipt",
        "accountId": "row-43",
        "customer": "SIBIN ISAC"
      },
      {
        "id": "row-43-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-43",
        "customer": "SIBIN ISAC"
      },
      {
        "id": "row-43-3",
        "index": 4,
        "value": 37200,
        "category": "receipt",
        "accountId": "row-43",
        "customer": "SIBIN ISAC"
      },
      {
        "id": "row-43-4",
        "index": 5,
        "value": 4140,
        "category": "receipt",
        "accountId": "row-43",
        "customer": "SIBIN ISAC"
      },
      {
        "id": "row-43-5",
        "index": 6,
        "value": -4140,
        "category": "structure",
        "accountId": "row-43",
        "customer": "SIBIN ISAC"
      }
    ],
    "received": 141340,
    "expenses": 4340,
    "incomingDates": [
      "02-10-2026",
      "17-10-2026",
      "21-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-44",
    "row": 44,
    "name": "ASKER.K",
    "consumer": "1165558046281",
    "engineer": "JUNAID",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 221000,
    "balance": 78000,
    "formula": "=100000-200+121200",
    "paymentDate": "01-10-2026",
    "deliveryDate": "15-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-44-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-44",
        "customer": "ASKER.K"
      },
      {
        "id": "row-44-1",
        "index": 2,
        "value": -200,
        "category": "agreement",
        "accountId": "row-44",
        "customer": "ASKER.K"
      },
      {
        "id": "row-44-2",
        "index": 3,
        "value": 121200,
        "category": "receipt",
        "accountId": "row-44",
        "customer": "ASKER.K"
      }
    ],
    "received": 221200,
    "expenses": 200,
    "incomingDates": [
      "01-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-45",
    "row": 45,
    "name": "SATHEESH P",
    "consumer": "1167145014791",
    "engineer": "VINEESH",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 135000,
    "balance": 61500,
    "formula": "135000",
    "paymentDate": "05-10-2026",
    "deliveryDate": "17-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-45-0",
        "index": 1,
        "value": 135000,
        "category": "receipt",
        "accountId": "row-45",
        "customer": "SATHEESH P",
        "date": "05-10-2026"
      }
    ],
    "received": 135000,
    "expenses": 0,
    "incomingDates": [
      "05-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-46",
    "row": 46,
    "name": "AKBARALI.P",
    "consumer": "1167954002940",
    "engineer": "ANVAR/ANSHAD",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 140000,
    "balance": 159000,
    "formula": "=140000-1000+1000",
    "paymentDate": "06-10-2026",
    "deliveryDate": "29-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-46-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-46",
        "customer": "AKBARALI.P"
      },
      {
        "id": "row-46-1",
        "index": 2,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-46",
        "customer": "AKBARALI.P"
      },
      {
        "id": "row-46-2",
        "index": 3,
        "value": 1000,
        "category": "receipt",
        "accountId": "row-46",
        "customer": "AKBARALI.P"
      }
    ],
    "received": 141000,
    "expenses": 1000,
    "incomingDates": [
      "06-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-47",
    "row": 47,
    "name": "MADHU P R",
    "consumer": "1165856025401",
    "engineer": "MANEESH",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 140000,
    "balance": 75000,
    "formula": "140000",
    "paymentDate": "06-10-2026",
    "deliveryDate": "17-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-47-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-47",
        "customer": "MADHU P R",
        "date": "06-10-2026"
      }
    ],
    "received": 140000,
    "expenses": 0,
    "incomingDates": [
      "06-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-48",
    "row": 48,
    "name": "ABDUL JABBAR",
    "consumer": "1165507025762",
    "engineer": "ANIL",
    "capacity": 3.54,
    "structure": "STD",
    "bill": 215000,
    "net": 119800,
    "balance": 95200,
    "formula": "=100000+50000-30000-200",
    "paymentDate": "09-10-2026",
    "deliveryDate": "16-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-48-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-48",
        "customer": "ABDUL JABBAR"
      },
      {
        "id": "row-48-1",
        "index": 2,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-48",
        "customer": "ABDUL JABBAR"
      },
      {
        "id": "row-48-2",
        "index": 3,
        "value": -30000,
        "category": "structure",
        "accountId": "row-48",
        "customer": "ABDUL JABBAR"
      },
      {
        "id": "row-48-3",
        "index": 4,
        "value": -200,
        "category": "agreement",
        "accountId": "row-48",
        "customer": "ABDUL JABBAR"
      }
    ],
    "received": 150000,
    "expenses": 30200,
    "incomingDates": [
      "09-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-49",
    "row": 49,
    "name": "SAKEER HUSSAIN",
    "consumer": "1165431014563",
    "engineer": "JULIYA",
    "capacity": 3.54,
    "structure": "STD",
    "bill": 215000,
    "net": 99000,
    "balance": 116000,
    "formula": "=100000-1000",
    "paymentDate": "09-10-2026",
    "deliveryDate": "16-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-49-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-49",
        "customer": "SAKEER HUSSAIN",
        "date": "09-10-2026"
      },
      {
        "id": "row-49-1",
        "index": 2,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-49",
        "customer": "SAKEER HUSSAIN"
      }
    ],
    "received": 100000,
    "expenses": 1000,
    "incomingDates": [
      "09-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-50",
    "row": 50,
    "name": "SOUDHA BEEGUM",
    "consumer": "1167143009758",
    "engineer": "PRADEEP VENDOR",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 130000,
    "balance": 66500,
    "formula": "130000",
    "paymentDate": "09-10-2026",
    "deliveryDate": "23-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-50-0",
        "index": 1,
        "value": 130000,
        "category": "receipt",
        "accountId": "row-50",
        "customer": "SOUDHA BEEGUM",
        "date": "09-10-2026"
      }
    ],
    "received": 130000,
    "expenses": 0,
    "incomingDates": [
      "09-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-51",
    "row": 51,
    "name": "SOSAMMA",
    "consumer": "1167134017959",
    "engineer": "PRADEEP VENDOR",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 130000,
    "balance": 66500,
    "formula": "130000",
    "paymentDate": "09-10-2026",
    "deliveryDate": "20-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-51-0",
        "index": 1,
        "value": 130000,
        "category": "receipt",
        "accountId": "row-51",
        "customer": "SOSAMMA",
        "date": "09-10-2026"
      }
    ],
    "received": 130000,
    "expenses": 0,
    "incomingDates": [
      "09-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-52",
    "row": 52,
    "name": "SHABEEB .N",
    "consumer": "1167708011419",
    "engineer": "HARSHAL",
    "capacity": 3.54,
    "structure": "STD",
    "bill": 215000,
    "net": 98800,
    "balance": 116200,
    "formula": "=100000-1000-200",
    "paymentDate": "12-10-2026",
    "deliveryDate": "16-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-52-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-52",
        "customer": "SHABEEB .N",
        "date": "12-10-2026"
      },
      {
        "id": "row-52-1",
        "index": 2,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-52",
        "customer": "SHABEEB .N"
      },
      {
        "id": "row-52-2",
        "index": 3,
        "value": -200,
        "category": "agreement",
        "accountId": "row-52",
        "customer": "SHABEEB .N"
      }
    ],
    "received": 100000,
    "expenses": 1200,
    "incomingDates": [
      "12-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-53",
    "row": 53,
    "name": "DEVAYANI K",
    "consumer": "1165526000602",
    "engineer": "RADHIKA/SHALET",
    "capacity": 3.54,
    "structure": "STD",
    "bill": 219200,
    "net": 100000,
    "balance": 119200,
    "formula": "100000",
    "paymentDate": "15-10-2026",
    "deliveryDate": "27-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-53-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-53",
        "customer": "DEVAYANI K",
        "date": "15-10-2026"
      }
    ],
    "received": 100000,
    "expenses": 0,
    "incomingDates": [
      "15-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-54",
    "row": 54,
    "name": "MUJEEB ALIPARA",
    "consumer": "1165523025752",
    "engineer": "RADHIKA/SHALET",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 304200,
    "net": 100000,
    "balance": 204200,
    "formula": "100000",
    "paymentDate": "15-10-2026",
    "deliveryDate": "27-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-54-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-54",
        "customer": "MUJEEB ALIPARA",
        "date": "15-10-2026"
      }
    ],
    "received": 100000,
    "expenses": 0,
    "incomingDates": [
      "15-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-55",
    "row": 55,
    "name": "ANAS KP",
    "consumer": "1165822005401",
    "engineer": "MANEESH",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 330600,
    "net": 150000,
    "balance": 180600,
    "formula": "150000",
    "paymentDate": "15-10-2026",
    "deliveryDate": "27-10-2026",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "OK"
      }
    ],
    "issues": [],
    "entries": [
      {
        "id": "row-55-0",
        "index": 1,
        "value": 150000,
        "category": "receipt",
        "accountId": "row-55",
        "customer": "ANAS KP",
        "date": "15-10-2026"
      }
    ],
    "received": 150000,
    "expenses": 0,
    "incomingDates": [
      "15-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-56",
    "row": 56,
    "name": "PRASANTH",
    "consumer": "1165244031389",
    "engineer": "MANEESH",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 116100,
    "balance": 98900,
    "formula": "=116100",
    "paymentDate": "16-10-2026",
    "deliveryDate": "24-10-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-56-0",
        "index": 1,
        "value": 116100,
        "category": "receipt",
        "accountId": "row-56",
        "customer": "PRASANTH",
        "date": "16-10-2026"
      }
    ],
    "received": 116100,
    "expenses": 0,
    "incomingDates": [
      "16-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-57",
    "row": 57,
    "name": "SHANAVAS EK",
    "consumer": "1163109002887",
    "engineer": "JUNAID",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 304200,
    "net": 100000,
    "balance": 204200,
    "formula": "100000",
    "paymentDate": "22-10-2026",
    "deliveryDate": "30-10-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-57-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-57",
        "customer": "SHANAVAS EK",
        "date": "22-10-2026"
      }
    ],
    "received": 100000,
    "expenses": 0,
    "incomingDates": [
      "22-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-58",
    "row": 58,
    "name": "REEBA",
    "consumer": "1165432022487",
    "engineer": "JUNAID",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 304200,
    "net": 100000,
    "balance": 204200,
    "formula": "100000",
    "paymentDate": "22-10-2026",
    "deliveryDate": "29-10-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-58-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-58",
        "customer": "REEBA",
        "date": "22-10-2026"
      }
    ],
    "received": 100000,
    "expenses": 0,
    "incomingDates": [
      "22-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-59",
    "row": 59,
    "name": "ABRAHAM MM",
    "consumer": "1165884009671",
    "engineer": "ASHFAQ/NAJMUDHEEN",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 201000,
    "net": 50000,
    "balance": 151000,
    "formula": "50000",
    "paymentDate": "22-10-2026",
    "deliveryDate": "29-10-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-59-0",
        "index": 1,
        "value": 50000,
        "category": "receipt",
        "accountId": "row-59",
        "customer": "ABRAHAM MM",
        "date": "22-10-2026"
      }
    ],
    "received": 50000,
    "expenses": 0,
    "incomingDates": [
      "22-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-60",
    "row": 60,
    "name": "RIYAZ",
    "consumer": "1165516003623",
    "engineer": "ANVAR",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 219200,
    "net": 150000,
    "balance": 69200,
    "formula": "150000",
    "paymentDate": "23-10-2026",
    "deliveryDate": "29-10-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-60-0",
        "index": 1,
        "value": 150000,
        "category": "receipt",
        "accountId": "row-60",
        "customer": "RIYAZ",
        "date": "23-10-2026"
      }
    ],
    "received": 150000,
    "expenses": 0,
    "incomingDates": [
      "23-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-61",
    "row": 61,
    "name": "ANEESH BABU K",
    "consumer": "1167805003647",
    "engineer": "ANOOP",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 200000,
    "balance": 99000,
    "formula": "200000",
    "paymentDate": "23-10-2026",
    "deliveryDate": "29-10-2026",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-61-0",
        "index": 1,
        "value": 200000,
        "category": "receipt",
        "accountId": "row-61",
        "customer": "ANEESH BABU K",
        "date": "23-10-2026"
      }
    ],
    "received": 200000,
    "expenses": 0,
    "incomingDates": [
      "23-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-62",
    "row": 62,
    "name": "HAMZA CK",
    "consumer": "1165791010167",
    "engineer": "VISHNU",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 25000,
    "balance": 190000,
    "formula": "",
    "paymentDate": "25-10-2026",
    "deliveryDate": "29-10-2026",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "25-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-63",
    "row": 63,
    "name": "ASHOK KUMAR",
    "consumer": "1165833033349",
    "engineer": "MANEESH",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 235200,
    "net": 150000,
    "balance": 85200,
    "formula": "150000",
    "paymentDate": "26-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-63-0",
        "index": 1,
        "value": 150000,
        "category": "receipt",
        "accountId": "row-63",
        "customer": "ASHOK KUMAR",
        "date": "26-10-2026"
      }
    ],
    "received": 150000,
    "expenses": 0,
    "incomingDates": [
      "26-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-64",
    "row": 64,
    "name": "ABDUL HAMEED",
    "consumer": "1165483018153",
    "engineer": "ANVAR",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 150500,
    "balance": 64500,
    "formula": "150500",
    "paymentDate": "26-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-64-0",
        "index": 1,
        "value": 150500,
        "category": "receipt",
        "accountId": "row-64",
        "customer": "ABDUL HAMEED",
        "date": "26-10-2026"
      }
    ],
    "received": 150500,
    "expenses": 0,
    "incomingDates": [
      "26-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-65",
    "row": 65,
    "name": "ABOOBACKER KOMBAN",
    "consumer": "1165648028364",
    "engineer": "NAJMUDHEEN",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 330600,
    "net": 140000,
    "balance": 190600,
    "formula": "140000",
    "paymentDate": "26-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-65-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-65",
        "customer": "ABOOBACKER KOMBAN",
        "date": "26-10-2026"
      }
    ],
    "received": 140000,
    "expenses": 0,
    "incomingDates": [
      "26-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-66",
    "row": 66,
    "name": "USMAN CK",
    "consumer": "1165452005984",
    "engineer": "ANVAR",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 304200,
    "net": 100000,
    "balance": 204200,
    "formula": "100000",
    "paymentDate": "27-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-66-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-66",
        "customer": "USMAN CK",
        "date": "27-10-2026"
      }
    ],
    "received": 100000,
    "expenses": 0,
    "incomingDates": [
      "27-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-67",
    "row": 67,
    "name": "ABDUSSAMAD AK",
    "consumer": "1165534025887",
    "engineer": "ANVAR",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 304200,
    "net": 107700,
    "balance": 196500,
    "formula": "=100000-1000+8700",
    "paymentDate": "27-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [
      {
        "id": "row-67-0",
        "index": 1,
        "value": 100000,
        "category": "receipt",
        "accountId": "row-67",
        "customer": "ABDUSSAMAD AK"
      },
      {
        "id": "row-67-1",
        "index": 2,
        "value": -1000,
        "category": "feasibility",
        "accountId": "row-67",
        "customer": "ABDUSSAMAD AK"
      },
      {
        "id": "row-67-2",
        "index": 3,
        "value": 8700,
        "category": "receipt",
        "accountId": "row-67",
        "customer": "ABDUSSAMAD AK"
      }
    ],
    "received": 108700,
    "expenses": 1000,
    "incomingDates": [
      "27-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-68",
    "row": 68,
    "name": "HAMZA K",
    "consumer": "1165594018270",
    "engineer": "NAJMUDHEEN,ANIL",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 151500,
    "balance": 63500,
    "formula": "151500",
    "paymentDate": "27-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-68-0",
        "index": 1,
        "value": 151500,
        "category": "receipt",
        "accountId": "row-68",
        "customer": "HAMZA K",
        "date": "27-10-2026"
      }
    ],
    "received": 151500,
    "expenses": 0,
    "incomingDates": [
      "27-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-69",
    "row": 69,
    "name": "SHAFEEK KT",
    "consumer": "1167143020516",
    "engineer": "VINEESH",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 135800,
    "balance": 60700,
    "formula": "135800",
    "paymentDate": "27-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-69-0",
        "index": 1,
        "value": 135800,
        "category": "receipt",
        "accountId": "row-69",
        "customer": "SHAFEEK KT",
        "date": "27-10-2026"
      }
    ],
    "received": 135800,
    "expenses": 0,
    "incomingDates": [
      "27-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-70",
    "row": 70,
    "name": "FRANCIS MC",
    "consumer": "1167134026330",
    "engineer": "SHARAFALI",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 135100,
    "balance": 79900,
    "formula": "135100",
    "paymentDate": "27-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-70-0",
        "index": 1,
        "value": 135100,
        "category": "receipt",
        "accountId": "row-70",
        "customer": "FRANCIS MC",
        "date": "27-10-2026"
      }
    ],
    "received": 135100,
    "expenses": 0,
    "incomingDates": [
      "27-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-71",
    "row": 71,
    "name": "THANOOJA",
    "consumer": "1165439017229",
    "engineer": "HARSHAL,FAHIMA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 140000,
    "balance": 159000,
    "formula": "140000",
    "paymentDate": "27-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [],
    "entries": [
      {
        "id": "row-71-0",
        "index": 1,
        "value": 140000,
        "category": "receipt",
        "accountId": "row-71",
        "customer": "THANOOJA",
        "date": "27-10-2026"
      }
    ],
    "received": 140000,
    "expenses": 0,
    "incomingDates": [
      "27-10-2026"
    ],
    "dateMismatch": false,
    "status": "outstanding"
  },
  {
    "id": "row-72",
    "row": 72,
    "name": "MOHAMMED ASHRAF VALAPRA",
    "consumer": "1165513018240",
    "engineer": "ANAS",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 140000,
    "balance": 75000,
    "formula": "",
    "paymentDate": "28-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "28-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-73",
    "row": 73,
    "name": "VASANTHY VM",
    "consumer": "1163103002216",
    "engineer": "VINEESH,PRADEEP",
    "capacity": 5.25,
    "structure": "SHEETROOF",
    "bill": 305000,
    "net": 140000,
    "balance": 165000,
    "formula": "",
    "paymentDate": "28-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "28-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-74",
    "row": 74,
    "name": "KADEEJA MK",
    "consumer": "1168149000121",
    "engineer": "SOORAJ",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 210983,
    "net": 135100,
    "balance": 75883,
    "formula": "",
    "paymentDate": "29-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "29-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-75",
    "row": 75,
    "name": "HANEEFA",
    "consumer": "1167959004543",
    "engineer": "NASIYA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 325500,
    "net": 140000,
    "balance": 185500,
    "formula": "",
    "paymentDate": "29-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "29-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-76",
    "row": 76,
    "name": "JIJU",
    "consumer": "1165459030333",
    "engineer": "SHALET,RADHIKA",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 304200,
    "net": 150000,
    "balance": 154200,
    "formula": "",
    "paymentDate": "29-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "29-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-77",
    "row": 77,
    "name": "MOHANDAS PC",
    "consumer": "1167140011024",
    "engineer": "VINEESH,PRADEEP",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 137000,
    "balance": 59500,
    "formula": "",
    "paymentDate": "30-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "30-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-78",
    "row": 78,
    "name": "ANNAMMA",
    "consumer": "1167143014214",
    "engineer": "VINEESH,PRADEEP",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 299000,
    "net": 140000,
    "balance": 159000,
    "formula": "",
    "paymentDate": "30-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "30-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-79",
    "row": 79,
    "name": "ALI BAPPU",
    "consumer": "1165510001470",
    "engineer": "ANAS",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 210983,
    "net": 193000,
    "balance": 17983,
    "formula": "",
    "paymentDate": "30-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "30-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-80",
    "row": 80,
    "name": "MUJEEB RAHMAN",
    "consumer": "1165511021283",
    "engineer": "JUNAID",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 100000,
    "balance": 96500,
    "formula": "",
    "paymentDate": "30-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "30-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-81",
    "row": 81,
    "name": "JAYESH N",
    "consumer": "1167064020728",
    "engineer": "VINEETH",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 325500,
    "net": 277175,
    "balance": 48325,
    "formula": "",
    "paymentDate": "30-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "30-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-82",
    "row": 82,
    "name": "SOUDA KC",
    "consumer": "1168146008975",
    "engineer": "JUNAID",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 133000,
    "balance": 82000,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-83",
    "row": 83,
    "name": "MUHAMMED ALI KARADIKKAL",
    "consumer": "1165436002719",
    "engineer": "ANVAR/NASIYA",
    "capacity": 3.51,
    "structure": "LONGRAIL",
    "bill": 224000,
    "net": 140000,
    "balance": 84000,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-84",
    "row": 84,
    "name": "MUHAMMED AP",
    "consumer": "1163108010785",
    "engineer": "RADHIKA/SHALET",
    "capacity": 6.38,
    "structure": "STD",
    "bill": 382700,
    "net": 99000,
    "balance": 283700,
    "formula": "",
    "paymentDate": "30-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [
      {
        "label": "Additional date (column 12)",
        "value": "31-10-2026"
      }
    ],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "30-10-2026",
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-85",
    "row": 85,
    "name": "JITHESH C",
    "consumer": "1167144015730",
    "engineer": "VINEESH,PRADEEP",
    "capacity": 2.95,
    "structure": "STD",
    "bill": 196500,
    "net": 147000,
    "balance": 49500,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-86",
    "row": 86,
    "name": "ZEENATH",
    "consumer": "1163103006068",
    "engineer": "ABHIJITH",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 135000,
    "balance": 80000,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-87",
    "row": 87,
    "name": "P ANEES",
    "consumer": "1167957013066",
    "engineer": "SHARAFALI",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 150500,
    "balance": 64500,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-88",
    "row": 88,
    "name": "ABDUL SALAM",
    "consumer": "1167708008914",
    "engineer": "ANVAR/RADHIKA/SHALET",
    "capacity": 5.25,
    "structure": "STD",
    "bill": 524800,
    "net": 100000,
    "balance": 424800,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-89",
    "row": 89,
    "name": "PRADEEP KS",
    "consumer": "1167952011763",
    "engineer": "VINEESH,PRADEEP",
    "capacity": 3.51,
    "structure": "STD",
    "bill": 215000,
    "net": 140000,
    "balance": 75000,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  },
  {
    "id": "row-90",
    "row": 90,
    "name": "ANANDHAN PC",
    "consumer": "1156872017552",
    "engineer": "VINEETH",
    "capacity": 4.72,
    "structure": "SHEETROOF",
    "bill": 270000,
    "net": 140000,
    "balance": 130000,
    "formula": "",
    "paymentDate": "31-10-2026",
    "deliveryDate": "REQUEST/OCTOBER",
    "extra": [],
    "issues": [
      "Payment breakdown not recorded",
      "Incoming payment count and recorded date count differ; dates need review"
    ],
    "entries": [],
    "received": null,
    "expenses": null,
    "incomingDates": [
      "31-10-2026"
    ],
    "dateMismatch": true,
    "status": "outstanding"
  }
];
