import React, { useMemo, useState } from "react";

type Process = "CNC" | "SLA" | "SLS" | "FDM" | "钣金";
type Material = "metal" | "plastic" | "resin" | "nylon";
const processMap: Record<Process, { base: number; label: string; lead: string }> = { CNC: { base: 980, label: "CNC", lead: "3-5 天" }, SLA: { base: 420, label: "SLA", lead: "2-4 天" }, SLS: { base: 650, label: "SLS", lead: "3-6 天" }, FDM: { base: 180, label: "FDM", lead: "1-3 天" }, 钣金: { base: 760, label: "钣金", lead: "4-7 天" } };
const materialFactor: Record<Material, number> = { metal: 2.2, plastic: 1, resin: 1.15, nylon: 1.28 };
export default function QuoteCalc() {
  const [material, setMaterial] = useState<Material>("plastic");
  const [process, setProcess] = useState<Process>("CNC");
  const [qty, setQty] = useState<number>(1);
  const [complexity, setComplexity] = useState<"low" | "mid" | "high">("mid");
  const [precision, setPrecision] = useState<"standard" | "high">("standard");
  const result = useMemo(() => {
    const base = processMap[process].base;
    const qtyFactor = qty <= 1 ? 1 : qty <= 5 ? 1.08 : qty <= 20 ? 1.18 : 1.35;
    const compFactor = complexity === "high" ? 1.35 : complexity === "mid" ? 1.12 : 1;
    const precisionFactor = precision === "high" ? 1.18 : 1;
    const cost = base * materialFactor[material] * qtyFactor * compFactor * precisionFactor;
    return {
      min: Math.round(cost * 0.85),
      max: Math.round(cost * 1.24),
      lead: processMap[process].lead,
      recommendation: process === "CNC" ? "适合高精度功能件与金属件验证。" : process === "SLA" ? "适合外观验证和高细节样件。" : process === "SLS" ? "适合复杂结构和尼龙功能件。" : process === "钣金" ? "适合结构件、机箱和装配件。" : "适合快速验证与低成本打样。"
    };
  }, [material, process, qty, complexity, precision]);
  return (
    <section className="section">
      <div className="container">
        <div className="section-title"><div className="kicker">RFQ</div><h2 className="h2">在线报价预估</h2><p className="lead">用于快速筛选工艺路径与价格区间。正式报价仍以工程文件与确认需求为准。</p></div>
        <div className="content-grid">
          <div className="panel" style={{ padding: 24 }}>
            <div className="form">
              <div className="field"><label>材料</label><select className="select" value={material} onChange={(e) => setMaterial(e.target.value as Material)}><option value="plastic">工程塑料</option><option value="metal">金属</option><option value="resin">树脂</option><option value="nylon">尼龙</option></select></div>
              <div className="field"><label>工艺</label><select className="select" value={process} onChange={(e) => setProcess(e.target.value as Process)}><option value="CNC">CNC</option><option value="SLA">SLA</option><option value="SLS">SLS</option><option value="FDM">FDM</option><option value="钣金">钣金</option></select></div>
              <div className="field"><label>数量</label><input className="input" type="number" min={1} step={1} value={qty} onChange={(e) => setQty(Number(e.target.value || 1))} /></div>
              <div className="grid-2"><div className="field"><label>复杂度</label><select className="select" value={complexity} onChange={(e) => setComplexity(e.target.value as any)}><option value="low">低</option><option value="mid">中</option><option value="high">高</option></select></div><div className="field"><label>精度要求</label><select className="select" value={precision} onChange={(e) => setPrecision(e.target.value as any)}><option value="standard">标准</option><option value="high">高精度</option></select></div></div>
            </div>
          </div>
          <div className="panel" style={{ padding: 24 }}>
            <div className="pill">Estimated Quote</div>
            <h3 className="h2" style={{ fontSize: '1.9rem', marginTop: 14 }}>¥{result.min.toLocaleString()} — ¥{result.max.toLocaleString()}</h3>
            <p className="muted" style={{ marginTop: 12 }}>{result.recommendation}</p>
            <div className="card" style={{ marginTop: 18 }}><div className="small">预计交期</div><div style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 6 }}>{result.lead}</div></div>
            <div className="card" style={{ marginTop: 18 }}><div className="small">建议动作</div><ul className="list-check" style={{ marginTop: 8 }}><li>上传 STEP / STL 文件</li><li>确认关键尺寸和装配关系</li><li>获取正式工程报价</li></ul></div>
          </div>
        </div>
      </div>
    </section>
  );
}
