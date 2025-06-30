export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  email: string;
};

export type SheetMusic = {
  id: string;
  title: string;
  description: string;
  composer: string;
  arranger: string;
  instrument: string;
  difficulty: string;
  file_path?: File;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  languages: string;
  image: string;
  languageImage: string;
};
