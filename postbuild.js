import fs from 'fs';

const files = ["index", "widget", "config"]

for(const file of files)
{
const html = fs.readFileSync(`build_widget/${file}.html`, 'utf8');

const match = html.match(/<script>([\s\S]*?)<\/script>/);

if(!match) continue;

fs.writeFileSync(`build_widget/${file}.js`, match[1]);

fs.writeFileSync(
	`build_widget/${file}.html`,
	html.replace(match[0], `<script src="./${file}.js"></script>`)
);
}
