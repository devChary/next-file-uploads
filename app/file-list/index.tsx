import { list } from "@vercel/blob";

// Components
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import DownloadButton from "./dowload-button";

const styles = {
  listItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid black`,
    borderRadius: "4px",
    marginBottom: "12px",
    padding: "8px 12px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "20px",
  },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default async function FileList() {
  const { blobs } = await list();

  if (!blobs) {
    return <div style={styles.emptyState}> No files Found!</div>;
  }

  return (
    <div className="blobs">
      {blobs.map(({ url, pathname, downloadUrl }) => {
        return (
          <div key={url} style={styles.listItems}>
            <h2> {pathname}</h2>
            <div style={styles.actions}>
              {/* <EditButton /> */}{" "}
              {/* Didn't find a method to edit the name of the file in Vercel Blob */}
              <DownloadButton dowloadUrl={downloadUrl} pathname={pathname} />
              <DeleteButton url={url} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
