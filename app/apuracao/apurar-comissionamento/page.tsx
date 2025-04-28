import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApurarComissionamentoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Apurar Comissionamento</h1>
      </div>

      <div className="flex items-center gap-4 max-w-xl">
        <Select defaultValue="AP-2025-03">
          <SelectTrigger>
            <SelectValue placeholder="Selecione a apuração" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AP-2025-04">Abril/2025</SelectItem>
            <SelectItem value="AP-2025-03">Março/2025</SelectItem>
            <SelectItem value="AP-2025-02">Fevereiro/2025</SelectItem>
            <SelectItem value="AP-2025-01">Janeiro/2025</SelectItem>
            <SelectItem value="AP-2024-12">Dezembro/2024</SelectItem>
          </SelectContent>
        </Select>
        <Button>Calcular Comissionamento</Button>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Certifique-se de verificar o atingimento de meta antes de calcular o comissionamento.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Comissionamento - Março/2025</CardTitle>
          <CardDescription>Apuração: AP-2025-03 | Categoria: Superação (109%)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Resultado da Apuração</h3>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Valor Produzido</TableHead>
                <TableHead className="text-right">Comissão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">V001</TableCell>
                <TableCell>Ana Silva</TableCell>
                <TableCell className="text-right">R$ 45.000,00</TableCell>
                <TableCell className="text-right">R$ 1.350,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V002</TableCell>
                <TableCell>Bruno Santos</TableCell>
                <TableCell className="text-right">R$ 38.000,00</TableCell>
                <TableCell className="text-right">R$ 1.140,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V003</TableCell>
                <TableCell>Carla Oliveira</TableCell>
                <TableCell className="text-right">R$ 52.000,00</TableCell>
                <TableCell className="text-right">R$ 1.560,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V005</TableCell>
                <TableCell>Eduardo Costa</TableCell>
                <TableCell className="text-right">R$ 35.000,00</TableCell>
                <TableCell className="text-right">R$ 1.050,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V006</TableCell>
                <TableCell>Fernanda Lima</TableCell>
                <TableCell className="text-right">R$ 42.000,00</TableCell>
                <TableCell className="text-right">R$ 1.260,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V008</TableCell>
                <TableCell>Helena Martins</TableCell>
                <TableCell className="text-right">R$ 28.000,00</TableCell>
                <TableCell className="text-right">R$ 840,00</TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">R$ 240.000,00</TableCell>
                <TableCell className="text-right">R$ 7.200,00</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div>
            <h3 className="text-lg font-semibold mb-2">Detalhes por Produto</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead className="text-right">% Comissão</TableHead>
                  <TableHead className="text-right">Valor Comissão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>PF Participativo</TableCell>
                  <TableCell className="text-right">R$ 120.000,00</TableCell>
                  <TableCell className="text-right">3%</TableCell>
                  <TableCell className="text-right">R$ 3.600,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Migração</TableCell>
                  <TableCell className="text-right">R$ 50.000,00</TableCell>
                  <TableCell className="text-right">1.5%</TableCell>
                  <TableCell className="text-right">R$ 750,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PJ Empresarial</TableCell>
                  <TableCell className="text-right">R$ 70.000,00</TableCell>
                  <TableCell className="text-right">3.5%</TableCell>
                  <TableCell className="text-right">R$ 2.450,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Opcional</TableCell>
                  <TableCell className="text-right">R$ 10.000,00</TableCell>
                  <TableCell className="text-right">4%</TableCell>
                  <TableCell className="text-right">R$ 400,00</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">R$ 250.000,00</TableCell>
                  <TableCell className="text-right"></TableCell>
                  <TableCell className="text-right">R$ 7.200,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
