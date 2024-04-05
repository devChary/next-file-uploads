import { list } from "@vercel/blob";

// Components
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import DownloadButton from "./dowload-button";

const commonStyles = {
  display: "flex",
  alignItems: "center",
};

const styles = {
  listItems: {
    ...commonStyles,
    justifyContent: "space-between",
    border: `1px solid black`,
    borderRadius: "4px",
    marginBottom: "12px",
    padding: "8px 12px",
  },
  actions: {
    ...commonStyles,
    justifyContent: "space-around",
    gap: "20px",
  },
  emptyState: {
    ...commonStyles,
    justifyContent: "center",
  },
  leftSection: {
    ...commonStyles,
    gap: "20px",
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
            <div style={styles.leftSection}>
              {/* Next Image doesn't work with server components */}
              <img src={url} width={25} height={25} alt={pathname} />
              <h2> {pathname}</h2>
            </div>
            <div style={styles.actions}>
              <EditButton pathname={pathname} />
              <DownloadButton dowloadUrl={downloadUrl} pathname={pathname} />
              <DeleteButton url={url} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
