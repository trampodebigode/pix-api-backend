import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/pix', async (req, res) => {
  const { valor, produto } = req.query;

  try {
    const response = await axios.post('https://api-pix.superlogica.net/v1/cob', {
      nome: "Cliente",
      cidade: "SP",
      valor,
      info: produto
    });

    res.json({
      qrcode: response.data.qrcode,
      pix: response.data.pix
    });
  } catch (err) {
    res.status(500).json({ erro: 'Falha na geração do Pix' });
  }
});

app.listen(3000, () => console.log("Servidor Pix rodando na porta 3000"));
