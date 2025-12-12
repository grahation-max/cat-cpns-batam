import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, BarChart2, BookOpen, RotateCcw, ChevronRight, ChevronLeft, Menu } from 'lucide-react';

const RAW_QUESTIONS = [
  // (paste semua soal dari code Gemini yang lo punya tadi, mulai dari id:1 sampe id:13 atau lebih)
  // contoh 3 soal biar lo bisa langsung commit dulu, nanti bisa ditambah lagi
  {
    id: 1, category: "TWK", question: "Pancasila sebagai ideologi terbuka mengandung makna bahwa...",
    options: ["Nilai-nilainya dapat diubah sesuai perkembangan zaman","Dapat menerima pengaruh ideologi asing tanpa filter","Nilai dasarnya tetap, namun penjabarannya dinamis dan mengikuti perkembangan zaman","Merupakan gabungan dari ideologi liberal dan sosialis","Hanya berlaku untuk kalangan tertentu saja"],
    answer: 2, explanation: "Ideologi terbuka artinya nilai dasar tetap, tapi nilai instrumental dan praksis fleksibel."
  },
  {
    id: 2, category: "TIU", question: "1, 3, 6, 10, 15, ...",
    options: ["20","21","22","23","24"], answer: 1, explanation: "Pola +2, +3, +4, +5, +6 → 15+6=21"
  },
  {
    id: 3, category: "TKP", question: "Atasan memberikan tugas mendadak padahal Anda sudah janji menjemput istri.",
    options: ["Menolak tugas","Mengerjakan sebisanya lalu pulang","Meminta bantuan rekan","Menunda penjemputan dan menyelesaikan tugas","Mengerjakan esok hari"],
    weights: [1,2,3,5,4], answer: 3, explanation: "Profesionalisme di atas kepentingan pribadi."
  }
  // tambah soal lain nanti aja, yang penting bisa jalan dulu
];

// (semua fungsi & component yang lo punya dari Gemini — copy-paste mentah-mentah mulai dari shuffleArray sampe component Result)

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);
const formatTime = (seconds) => `\( {String(Math.floor(seconds/60)).padStart(2,'0')}: \){String(seconds%60).padStart(2,'0')}`;

// Navbar, ResultChart, Home, Guide, Exam, Result — paste semua yang lo punya lo (gue skip space biar cepat)

function App() {
  const [view, setView] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState({ twk:0, tiu:0, tkp:0, total:0 });

  const passingGrade = { twk:65, tiu:80, tkp:156 };

  const startExam = () => {
    const shuffled = shuffleArray(RAW_QUESTIONS);
    setQuestions(shuffled);
    setAnswers({});
    setView('exam');
  };

  const finishExam = (finalAnswers) => {
    let twk = 0, tiu = 0, tkp = 0;
    questions.forEach(q => {
      const ans = finalAnswers[q.id];
      if (q.category === 'TWK' || q.category === 'TIU') {
        if (ans === q.answer) (q.category === 'TWK' ? twk += 5 : tiu += 5);
      } else if (q.weights) {
        tkp += q.weights[ans] || 1;
      }
    });
    const total = twk + tiu + tkp;
    setScore({ twk, tiu, tkp, total });
    setView('result');
  };

  return (
    <>
      {view === 'home' && <Home setView={setView} />}
      {view === 'guide' && <Guide startExam={startExam} />}
      {view === 'exam' && <Exam questions={questions} finishExam={finishExam} />}
      {view === 'result' && <Result score={score} passingGrade={passingGrade} setView={setView} />}
    </>
  );
}

export default App;
