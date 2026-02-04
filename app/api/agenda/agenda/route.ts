import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// 1. Configuração de Acesso (Service Account)
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth);

// --- FUNÇÃO PARA PEGAR OS EVENTOS (GET) ---
export async function GET() {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Agenda']; // Nome exato da sua aba
    const rows = await sheet.getRows();

    const events = rows.map((row) => ({
      id: row.get('ID') || Math.random().toString(),
      title: row.get('Conteudo_Principal'),
      start: row.get('Data_Inicio'),
      backgroundColor: row.get('Cor') || '#f5886c',
      extendedProps: {
        legenda: row.get('Conteudo_Secundario'),
        perfil: row.get('Perfil'),
        tipo: row.get('Tipo'),
      },
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Erro ao buscar agenda:', error);
    return NextResponse.json({ error: 'Erro ao carregar dados' }, { status: 500 });
  }
}

// --- FUNÇÃO PARA SALVAR NOVO POST (POST) ---
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Agenda'];

    // Adiciona a linha exatamente com os nomes das colunas da sua planilha
    await sheet.addRow({
      Data_Inicio: data.start,
      Conteudo_Principal: data.titulo,
      Conteudo_Secundario: data.legenda,
      Perfil: data.perfil || 'Geral',
      Cor: data.cor,
      Tipo: data.tipo,
      WhatsApp_ID: data.wa,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar na planilha:', error);
    return NextResponse.json({ error: 'Erro ao salvar dados' }, { status: 500 });
  }
}