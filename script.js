function generateCommand() {
  let command = 'sqlmap';

  // 目标选项
  const url = document.getElementById('url').value;
  const direct = document.getElementById('direct').value;
  const logfile = document.getElementById('logfile').value;
  const bulkfile = document.getElementById('bulkfile').value;
  const requestfile = document.getElementById('requestfile').value;
  const googledork = document.getElementById('googledork').value;
  const configfile = document.getElementById('configfile').value;

  if (url) command += ` -u "${url}"`;
  if (direct) command += ` -d "${direct}"`;
  if (logfile) command += ` -l "${logfile}"`;
  if (bulkfile) command += ` -m "${bulkfile}"`;
  if (requestfile) command += ` -r "${requestfile}"`;
  if (googledork) command += ` -g "${googledork}"`;
  if (configfile) command += ` -c "${configfile}"`;

  // 请求选项
  const data = document.getElementById('data').value;
  const cookie = document.getElementById('cookie').value;
  const agent = document.getElementById('agent').value;
  const headers = document.getElementById('headers').value;
  const method = document.getElementById('method').value;
  const timeoutValue = document.getElementById('timeout').value;
  const delayValue = document.getElementById('delay').value;
  const retriesValue = document.getElementById('retries').value;
  const proxy = document.getElementById('proxy').value;
  const proxyCred = document.getElementById('proxy-cred').value;
  const authCred = document.getElementById('auth-cred').value;
  const safeUrl = document.getElementById('safe-url').value;
  const safePost = document.getElementById('safe-post').value;

  if (data) command += ` --data="${data}"`;
  if (cookie) command += ` --cookie="${cookie}"`;
  if (agent) command += ` --user-agent="${agent}"`;
  if (headers) command += ` --headers="${headers}"`;
  if (method) command += ` --method="${method}"`;
  if (timeoutValue) command += ` --timeout=${timeoutValue}`;
  if (delayValue) command += ` --delay=${delayValue}`;
  if (retriesValue) command += ` --retries=${retriesValue}`;
  if (proxy) command += ` --proxy="${proxy}"`;
  if (proxyCred) command += ` --proxy-cred="${proxyCred}"`;
  if (authCred) command += ` --auth-cred="${authCred}"`;
  if (safeUrl) command += ` --safe-url="${safeUrl}"`;
  if (safePost) command += ` --safe-post="${safePost}"`;

  // 检测选项
  const level = document.getElementById('level').value;
  const risk = document.getElementById('risk').value;
  const verbosity = document.getElementById('verbosity').value;

  command += ` --level=${level} --risk=${risk} -v ${verbosity}`;

  // 注入技术
  let techniques = '';
  ['b', 'e', 'u', 's', 't', 'q'].forEach(tech => {
      if (document.getElementById(`tech-${tech}`).checked) {
          techniques += tech.toUpperCase();
      }
  });
  if (techniques) command += ` --technique=${techniques}`;

  // 枚举选项
  const enumOptions = [
      'all', 'banner', 'current-user', 'current-db', 'passwords',
      'dbs', 'tables', 'columns', 'schema', 'dump'
  ];
  enumOptions.forEach(opt => {
      if (document.getElementById(opt).checked) {
          command += ` --${opt}`;
      }
  });

  // 高级选项
  const advancedOptions = ['os-shell', 'os-pwn', 'batch', 'flush-session', 'keep-alive'];
  advancedOptions.forEach(opt => {
      if (document.getElementById(opt).checked) {
          command += ` --${opt}`;
      }
  });

  const threads = document.getElementById('threads').value;
  if (threads) command += ` --threads=${threads}`;

  // 文件系统访问
  const fileRead = document.getElementById('file-read').value;
  const fileWrite = document.getElementById('file-write').value;

  if (fileRead) command += ` --file-read="${fileRead}"`;
  if (fileWrite) command += ` --file-write="${fileWrite}"`;

  // 操作系统访问
  const osCmd = document.getElementById('os-cmd').value;
  if (osCmd) command += ` --os-cmd="${osCmd}"`;

  document.getElementById('output').textContent = command;
}

function copyCommand() {
  const output = document.getElementById('output');
  navigator.clipboard.writeText(output.textContent)
      .then(() => {
          const btn = document.querySelector('.copy-btn');
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy Command', 2000);
      })
      .catch(err => console.error('Failed to copy:', err));
}

// 处理不兼容选项
document.getElementById('all').addEventListener('change', function() {
  const enumOptions = [
      'banner', 'current-user', 'current-db', 'passwords',
      'dbs', 'tables', 'columns', 'schema', 'dump'
  ];
  enumOptions.forEach(opt => {
      const el = document.getElementById(opt);
      el.disabled = this.checked;
      if (this.checked) el.checked = false;
  });
});
