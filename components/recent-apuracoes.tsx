import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentApuracoes = [
  {
    id: "AP-2025-03",
    periodo: "Março/2025",
    meta: "R$ 220.000,00",
    realizado: "R$ 240.000,00",
    percentual: "109%",
    status: "Concluída",
  },
  {
    id: "AP-2025-02",
    periodo: "Fevereiro/2025",
    meta: "R$ 200.000,00",
    realizado: "R$ 220.000,00",
    percentual: "110%",
    status: "Concluída",
  },
  {
    id: "AP-2025-01",
    periodo: "Janeiro/2025",
    meta: "R$ 200.000,00",
    realizado: "R$ 180.000,00",
    percentual: "90%",
    status: "Concluída",
  },
  {
    id: "AP-2024-12",
    periodo: "Dezembro/2024",
    meta: "R$ 180.000,00",
    realizado: "R$ 200.000,00",
    percentual: "111%",
    status: "Concluída",
  },
  {
    id: "AP-2024-11",
    periodo: "Novembro/2024",
    meta: "R$ 180.000,00",
    realizado: "R$ 175.000,00",
    percentual: "97%",
    status: "Concluída",
  },
]

export function RecentApuracoes() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Período</TableHead>
          <TableHead className="text-right">% Atingido</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentApuracoes.map((apuracao) => (
          <TableRow key={apuracao.id}>
            <TableCell className="font-medium">{apuracao.id}</TableCell>
            <TableCell>{apuracao.periodo}</TableCell>
            <TableCell className="text-right">{apuracao.percentual}</TableCell>
            <TableCell className="text-right">
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                {apuracao.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
