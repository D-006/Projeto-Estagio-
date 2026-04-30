import { useState, useEffect } from "react";

const storeLinks = {
  "AMD Ryzen 5 5600X": "https://www.pcdiga.com",
  "Intel Core i5-12400F": "https://www.globaldata.pt",
  "AMD Ryzen 7 5800X": "https://www.pcdiga.com",
  "NVIDIA RTX 3060": "https://www.globaldata.pt",
  "NVIDIA RTX 4060": "https://www.pcdiga.com",
  "AMD RX 6600": "https://www.globaldata.pt",
};

const partsDB = {
  CPUs: [
    { name: "AMD Ryzen 5 5600X", price: 180, socket: "AM4" },
    { name: "Intel Core i5-12400F", price: 170, socket: "LGA1700" },
    { name: "AMD Ryzen 7 5800X", price: 250, socket: "AM4" },
  ],
  GPUs: [
    { name: "AMD RX 6600", price: 280 },
    { name: "NVIDIA RTX 3060", price: 320 },
    { name: "NVIDIA RTX 4060", price: 350 },
  ],
  Motherboards: [
    { name: "ASUS B550", price: 120, socket: "AM4" },
    { name: "MSI B660", price: 130, socket: "LGA1700" },
    { name: "Gigabyte X570", price: 180, socket: "AM4" },
  ],
  RAM: [
    { name: "Corsair Vengeance 16GB DDR4", price: 70 },
    { name: "Kingston Fury 32GB DDR4", price: 130 },
    { name: "G.Skill 16GB DDR5", price: 110 },
  ],
  Storage: [
    { name: "SSD Kingston NV2 1TB", price: 70 },
    { name: "SSD Samsung 970 EVO 1TB", price: 90 },
    { name: "HDD Seagate 2TB", price: 60 },
  ],
  PSU: [
    { name: "Corsair 650W", price: 80 },
    { name: "EVGA 750W", price: 95 },
    { name: "Seasonic 850W", price: 120 },
  ],
  Case: [
    { name: "Cooler Master MB520", price: 75 },
    { name: "NZXT H510", price: 90 },
    { name: "Corsair 4000D", price: 100 },
  ],
  Cooler: [
    { name: "Cooler Master Hyper 212", price: 35 },
    { name: "Arctic Freezer 34", price: 40 },
    { name: "Noctua NH-D15", price: 90 },
  ],
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [budget, setBudget] = useState(0);
  const [type, setType] = useState("gaming");
  const [build, setBuild] = useState(null);
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [view, setView] = useState("builder");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);

    const saved = localStorage.getItem("builds");
    if (saved) setSavedBuilds(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("builds", JSON.stringify(savedBuilds));
  }, [savedBuilds]);

  const handleAuth = () => {
    if (authForm.email && authForm.password) {
      setUser(authForm.email);
      localStorage.setItem("user", authForm.email);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const generateBuild = () => {
    if (!user) return alert("Precisas de login para criar builds!");

    let total = 0;
    const selected = {};

    const cpu = partsDB.CPUs.find(c => c.price <= budget);
    if (!cpu) return;
    selected.CPU = cpu;
    total += cpu.price;

    const mobo = partsDB.Motherboards.find(m => m.socket === cpu.socket && total + m.price <= budget);
    if (mobo) {
      selected.Motherboard = mobo;
      total += mobo.price;
    }

    const pick = (category) => {
      const item = partsDB[category].find(i => total + i.price <= budget);
      if (item) {
        selected[category] = item;
        total += item.price;
      }
    };

    pick("RAM");
    pick("Storage");
    pick("PSU");
    pick("Case");
    pick("Cooler");

    if (type === "gaming") pick("GPUs");

    setBuild({ parts: selected, total });
  };

  const saveBuild = () => {
    if (!user) return;
    setSavedBuilds([...savedBuilds, build]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* AUTH TOP LEFT */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">PC Builder Pro</h1>
        <div>
          {!user ? (
            <div className="flex gap-2">
              <input placeholder="Email" className="border p-1" onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
              <input type="password" placeholder="Password" className="border p-1" onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
              <button className="bg-blue-500 text-white p-1" onClick={handleAuth}>Login</button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span>{user}</span>
              <button className="bg-red-500 text-white p-1" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setView("builder")} className="bg-blue-500 text-white p-2">Builder</button>
        <button onClick={() => setView("catalog")} className="bg-gray-500 text-white p-2">Peças</button>
      </div>

      {view === "builder" && (
        <div>
          {!user && <p className="text-red-500 mb-2">Faz login para criar builds</p>}

          <input type="number" placeholder="Orçamento (€)" className="border p-2 w-full mb-2" onChange={(e) => setBudget(Number(e.target.value))} />

          <select className="border p-2 w-full mb-2" onChange={(e) => setType(e.target.value)}>
            <option value="gaming">Gaming</option>
            <option value="escritorio">Escritório</option>
          </select>

          <button className="bg-green-500 text-white p-2 w-full" onClick={generateBuild}>
            Gerar Build
          </button>

          {build && (
            <div className="border p-4 mt-4 rounded-2xl shadow">
              <h2 className="font-bold">Build Gerada</h2>
              <ul>
                {Object.entries(build.parts).map(([cat, p], i) => (
                  <li key={i}>{cat}: {p.name} - €{p.price}</li>
                ))}
              </ul>
              <p className="font-bold mt-2">Total: €{build.total}</p>
              <button className="bg-blue-500 text-white p-2 mt-2" onClick={saveBuild}>Guardar Build</button>
            </div>
          )}

          <div className="mt-4">
            <h2 className="font-bold">Builds Guardadas</h2>
            {savedBuilds.map((b, i) => (
              <div key={i} className="border p-2 mb-2">
                <p>Total: €{b.total}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "catalog" && (
        <div>
          <input placeholder="Pesquisar..." className="border p-2 w-full mb-4" onChange={(e) => setFilter(e.target.value.toLowerCase())} />

          {Object.entries(partsDB).map(([cat, items]) => (
            <div key={cat} className="mb-4">
              <h3 className="font-bold">{cat}</h3>
              {items
                .filter(i => i.name.toLowerCase().includes(filter))
                .map((item, i) => (
                  <div key={i} className="border p-2 flex justify-between">
                    <span>{item.name} - €{item.price}</span>
                    {storeLinks[item.name] && (
                      <a href={storeLinks[item.name]} target="_blank" className="text-blue-500">Comprar</a>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
