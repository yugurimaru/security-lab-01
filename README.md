Security Lab 01 - Análise de Vulnerabilidades
🔒 Sobre o Projeto

Aplicação Node.js desenvolvida para demonstrar práticas de segurança com GitHub Actions.

✅ Correções Implementadas

Vulnerabilidades de Dependências
    Atualização de todas as dependências para versões seguras
    Configuração do Dependabot para monitoramento contínuo

Vulnerabilidades de Código
    SQL Injection corrigido com prepared statements
    XSS corrigido com sanitização de entrada
    Remoção de endpoint que expunha informações sensíveis
    Implementação de rate limiting
    Headers de segurança com Helmet

🚀 Executar Localmente

npm install
cp .env.example .env
npm start

🔍 Verificações de Segurança
- Dependabot
- Semgrep
- npm audit

📊 Status
SAST Scan
