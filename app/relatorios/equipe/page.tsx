import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileSpreadsheet } from "lucide-react"

export default function RelatoriosEquipePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Relatório de Apuração de Equipe</h1>
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
        <Button>
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Gerar Relatório
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatório de Apuração - Março/2025</CardTitle>
          <CardDescription>Apuração: AP-2025-03 | Período: 01/03/2025 a 31/03/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">ID de Apuração</h3>
              <p className="font-medium">AP-2025-03</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Ano de Apuração</h3>
              <p className="font-medium">2025</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Data Inicial</h3>
              <p className="font-medium">01/03/2025</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Data Final</h3>
              <p className="font-medium">31/03/2025</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Meta</h3>
              <p className="font-medium">R$ 220.000,00</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Realizado</h3>
              <p className="font-medium">R$ 240.000,00</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Percentual Atingido</h3>
              <p className="font-medium">109%</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Valor Total de Comissão</h3>
              <p className="font-medium">R$ 7.200,00</p>
            </div>
            <div className="space-y-2 col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">Valor Total de Premiação Trimestral</h3>
              <p className="font-medium">R$ 5.000,00</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar XLSX
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
