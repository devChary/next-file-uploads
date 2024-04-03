import FileList from "./file-list";
import FileUpload from "./file-upload";

export default function Home() {
  return (
    <main
      style={{
        padding: "24px",
      }}
    >
      <FileUpload />
      <FileList />
    </main>
  );
}
