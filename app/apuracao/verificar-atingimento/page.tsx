import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function VerificarAtingimentoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Verificar Atingimento de Meta</h1>
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
        <Button>Verificar</Button>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Atingimento de Meta - Março/2025</CardTitle>
          <CardDescription>Apuração: AP-2025-03 | Período: 01/03/2025 a 31/03/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Meta: R$ 220.000,00</span>
              <span className="text-sm font-medium">Realizado: R$ 240.000,00</span>
            </div>
            <Progress value={109} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
              <span>150%</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Detalhes do Atingimento</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Percentual Atingido</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Faixa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">109%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Superação
                    </Badge>
                  </TableCell>
                  <TableCell>100% a 120%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Produtos Contabilizados</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>PF Participativo</TableCell>
                  <TableCell className="text-right">R$ 120.000,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Migração</TableCell>
                  <TableCell className="text-right">R$ 50.000,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PJ Empresarial</TableCell>
                  <TableCell className="text-right">R$ 70.000,00</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">R$ 240.000,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
