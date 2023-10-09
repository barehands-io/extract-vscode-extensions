import { exec } from "child_process";
import { writeFile } from "fs";

exec("code --list-extensions", (error: any, stdout: any, stderr: any) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  const extensions = stdout.split("\n").filter(Boolean);

  // Convert the list of extensions to HTML format with links
  const htmlContent = `
    <html>
      <head>
        <title>VS Code Extensions</title>
      </head>
      <body>
        <h1>Installed VS Code Extensions:</h1>
        <ul>
          ${extensions
            .map(
              (ext: any) =>
                `<li><a href="https://marketplace.visualstudio.com/items?itemName=${ext}" target="_blank">${ext}</a></li>`
            )
            .join("")}
        </ul>
      </body>
    </html>
  `;

  // Write the HTML content to a file
  writeFile("extensions.html", htmlContent, (err) => {
    if (err) {
      console.error(`Error writing to file: ${err}`);
    } else {
      console.log("Extensions with links saved to extensions.html");
    }
  });
});
