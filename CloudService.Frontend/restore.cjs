const fs = require('fs');
const path = 'C:\\Users\\hoang\\.gemini\\antigravity-ide\\brain\\b6c36530-b154-40e3-8f9a-95af236aff85\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

let versions = [];
for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if ((call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') && 
                    call.args.TargetFile && call.args.TargetFile.includes('Login.tsx')) {
                    versions.push(call);
                }
            }
        }
    } catch (e) {}
}

console.log(`Found ${versions.length} edits to Login.tsx`);
for (let i = 0; i < versions.length; i++) {
    fs.writeFileSync(`Login_v${i}.json`, JSON.stringify(versions[i].args, null, 2), 'utf8');
}
