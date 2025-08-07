import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
function LabseqResult() {
  const { n } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLabseq = async () => {
      if (!n || isNaN(n) || parseInt(n) < 0) {
        setError('N inválido');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`http://localhost:8080/labseq/${n}`);
        
        if (!response.ok) {
          setError('Erro na requisição');
          setResult(null);
        } else {
          const data = await response.json();
          setResult(data);
        }
      } catch (err) {
        setError('Backend não está rodando');
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLabseq();
  }, [n]);

  if (loading) return <div className="loading">Calculando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!result) return <div className="error">Sem resultado</div>;

  const isLargeValue = result.value && result.value.length > 20;

  return (
    <div className="container">
      <div className="value-box">
        <span className="label">N:</span>
        <span className="value">{result.n}</span>
      </div>
      <div className="value-box">
        <span className="label">VALUE:</span>
        <span className={`value ${isLargeValue ? 'value-large' : ''}`}>
          {result.value}
        </span>
      </div>
    </div>
  );
}


function HomePage() {
  return (
    <div className="container">
      <p>Acesse: /labseq/10</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/labseq/:n" element={<LabseqResult />} />
      </Routes>
    </Router>
  );
}

export default App;
