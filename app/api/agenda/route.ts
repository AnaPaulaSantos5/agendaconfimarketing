import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// 1. CONFIGURAÇÃO DE AUTENTICAÇÃO (VERSÃO 4)
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth);

export async function GET() {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Agenda'];
    const rows = await sheet.getRows();

    // Na v4, usamos .get('Nome_Coluna') em vez de acessar a propriedade direto
    const events = rows.map((row) => ({
      id: row.rowNumber.toString(), // rowNumber substitui o _rowNumber particular
      title: row.get('Conteudo_Principal'),
      start: row.get('Data_Inicio'),
      backgroundColor: row.get('Cor') || '#f5886c',
      extendedProps: {
        perfil: row.get('Perfil'),
        legenda: row.get('Conteudo_Secundario'),
      }
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Falha ao carregar dados' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Agenda'];

    await sheet.addRow({
      Data_Inicio: data.start,
      Conteudo_Principal: data.titulo,
      Conteudo_Secundario: data.legenda,
      Perfil: data.perfil,
      Cor: data.cor,
      Tipo: data.tipo,
      WhatsApp_ID: data.wa
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
  }
}