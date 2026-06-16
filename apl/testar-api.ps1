# EcoFit - Script de Teste da API (Versão Nativa PowerShell)
$BASE = "http://localhost:8080/api"

Write-Host "=== EcoFit API Test ===`n" -ForegroundColor Cyan

# 1. Registro
Write-Host ">>> 1. Registro de usuário" -ForegroundColor Yellow
$bodyRegistro = @{ nome="João Silva"; email="joao@teste.com"; senha="123456"; endereco="Rua A, 123" }
$register = Invoke-RestMethod -Uri "$BASE/auth/register" -Method Post -Body ($bodyRegistro | ConvertTo-Json) -ContentType "application/json"
$token = $register.token
Write-Host ($register | ConvertTo-Json -Compress)

# 2. Login
Write-Host "`n>>> 2. Login" -ForegroundColor Yellow
$bodyLogin = @{ email="joao@teste.com"; senha="123456" }
$login = Invoke-RestMethod -Uri "$BASE/auth/login" -Method Post -Body ($bodyLogin | ConvertTo-Json) -ContentType "application/json"
Write-Host ($login | ConvertTo-Json -Compress)
# Opcional: pegar o ID do usuário se a API retornar no login
# $idUsuario = $login.usuario.id 

# 3. OAuth (Google)
Write-Host "`n>>> 3. OAuth Google" -ForegroundColor Yellow
$bodyOauth = @{ provedor="google"; provedorId="abc123"; email="maria@gmail.com"; nome="Maria" }
$oauth = Invoke-RestMethod -Uri "$BASE/auth/oauth" -Method Post -Body ($bodyOauth | ConvertTo-Json) -ContentType "application/json"
Write-Host ($oauth | ConvertTo-Json -Compress)

# Configurando Cabeçalho de Autorização para os próximos passos
$headers = @{ Authorization = "Bearer $token" }

# 4. Criar itens (protegido)
Write-Host "`n>>> 4. Criar itens" -ForegroundColor Yellow
$bodyItem1 = @{ itemNome="Arroz Integral"; itemDescricao="Arroz integral 100g"; itemCusto=3.00; itemValor=5.50 }
$item1 = Invoke-RestMethod -Uri "$BASE/itens" -Method Post -Headers $headers -Body ($bodyItem1 | ConvertTo-Json) -ContentType "application/json"

$bodyItem2 = @{ itemNome="Frango Grelhado"; itemDescricao="Frango grelhado 150g"; itemCusto=5.00; itemValor=9.90 }
$item2 = Invoke-RestMethod -Uri "$BASE/itens" -Method Post -Headers $headers -Body ($bodyItem2 | ConvertTo-Json) -ContentType "application/json"

Write-Host ($item1 | ConvertTo-Json -Compress)
Write-Host ($item2 | ConvertTo-Json -Compress)
$idItem1 = $item1.id
$idItem2 = $item2.id

# 5. Criar box padrão (protegido)
Write-Host "`n>>> 5. Criar Box padrão" -ForegroundColor Yellow
$bodyBox = @{ 
    nome = "Box Fit"; descricao = "Box saudável completa"; preco = 25.90; tipo = "padrao"; 
    itens = @(
        @{ itemId = $idItem1; quantidade = 2 }, 
        @{ itemId = $idItem2; quantidade = 1 }
    ) 
}
# ConvertTo-Json -Depth 3 é importante aqui por causa das listas aninhadas (itens)
$box = Invoke-RestMethod -Uri "$BASE/boxes" -Method Post -Headers $headers -Body ($bodyBox | ConvertTo-Json -Depth 3) -ContentType "application/json"
Write-Host ($box | ConvertTo-Json -Compress)
$idBox = $box.id

# 6. Listar boxes (público)
Write-Host "`n>>> 6. Listar boxes (público)" -ForegroundColor Yellow
$boxesLista = Invoke-RestMethod -Uri "$BASE/boxes" -Method Get
Write-Host ($boxesLista | ConvertTo-Json -Depth 4)

# 7. Criar pedido
Write-Host "`n>>> 7. Criar pedido" -ForegroundColor Yellow
$bodyPedido = @{ boxId = $idBox; usuarioId = 1; enderecoEntrega = "Rua B, 456"; metodoPagamento = "pix" }
$pedido = Invoke-RestMethod -Uri "$BASE/pedidos" -Method Post -Headers $headers -Body ($bodyPedido | ConvertTo-Json) -ContentType "application/json"
Write-Host ($pedido | ConvertTo-Json -Compress)
$idPedido = $pedido.id

# 8. Atualizar status do pedido
Write-Host "`n>>> 8. Atualizar status do pedido" -ForegroundColor Yellow
$bodyStatus = @{ status = "pago" }
$statusUpdate = Invoke-RestMethod -Uri "$BASE/pedidos/$idPedido/status" -Method Patch -Headers $headers -Body ($bodyStatus | ConvertTo-Json) -ContentType "application/json"
Write-Host ($statusUpdate | ConvertTo-Json -Compress)

Write-Host "`n=== Testes concluídos ===" -ForegroundColor Green
