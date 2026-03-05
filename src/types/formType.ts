export interface FormType {
  title: string;
  type: "list" | "folder" | "inbox";
  folderName?: string;
  folderId?: string;
}
