import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function indexPDFDocument(filePath: string): Promise<void> {
  const loader = new PDFLoader(filePath, { splitPages: false });
  const doc = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 80,
  });

  const splitDocs = await textSplitter.splitDocuments(
    doc[0]?.pageContent ? [doc[0]] : [],
  );
  console.log(splitDocs);
}
