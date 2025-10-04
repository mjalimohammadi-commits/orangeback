import React, {useState} from 'react'

// Brand colors (used as inline values and Tailwind arbitrary classes)
// Primary Orange: #FF6A00  | Secondary Black: #0B0B0B

function LogoSVG({className='h-8 w-auto'}){
  return (
    <div className={"flex items-center " + className}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="home/aa-2025-0080/orangeback/Orangeback_pictures/logo.png" aria-hidden>
        <rect x="1" y="4" width="18" height="14" rx="3" fill="#FF6A00"/>
        <path d="M16 8.5H12c-0.55 0-1 .45-1 1v.5h6V9.5c0-.55-.45-1-1-1z" fill="#fff" opacity="0.9"/>
        <path d="M6 11h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      </svg>
      <span className="ml-3 font-semibold text-[#0B0B0B] text-lg">OrangeBack</span>
    </div>
  )
}

/* ---------- UI Kit components ---------- */

function ButtonPrimary({children, onClick}){
  return (
    <button onClick={onClick}
      className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold text-white bg-[#FF6A00] hover:bg-[#E85C00] shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6A00]">
      {children}
    </button>
  )
}

function ButtonSecondary({children, onClick}){
  return (
    <button onClick={onClick}
      className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium text-[#FF6A00] border-2 border-[#FF6A00] hover:bg-[#FF6A00] hover:text-white transition">
      {children}
    </button>
  )
}

function Badge({children, type='accent'}){
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'
  if(type==='success') return <span className={base + ' bg-[#2ECC71] text-white'}>{children}</span>
  if(type==='danger') return <span className={base + ' bg-[#E74C3C] text-white'}>{children}</span>
  return <span className={base + ' bg-[#FFEDD9] text-[#FF6A00] border border-[#FFD6B8]'}>{children}</span>
}

function Card({children, className=''}){
  return (
    <div className={"bg-white rounded-xl shadow-sm p-4 " + className}>
      {children}
    </div>
  )
}

/* ---------- Small icons (inline, simple) ---------- */
function IconSearch(){
  return (
    <svg className="w-5 h-5 text-[#6E6E6E]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6E6E6E"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>
  )
}

function IconHome(){
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="1.5"><path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 21V11h14v10" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
}

/* ---------- Product card (used on home and product list) ---------- */
function ProductCard({product}){
  return (
    <Card className="flex flex-col gap-3">
      <div className="rounded-md overflow-hidden bg-[#F7F7F7] aspect-[4/3] flex items-center justify-center">
        <img src={product.image} alt={product.title} className="object-contain max-h-36"/>
      </div>
      <div>
        <h3 className="text-[#0B0B0B] text-lg font-semibold">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-sm text-[#6E6E6E]">{product.priceCurrency}{product.price}</div>
            <div className="mt-1"><Badge>{product.cashbackLabel}</Badge></div>
          </div>
          <ButtonPrimary>Shop Now</ButtonPrimary>
        </div>
      </div>
    </Card>
  )
}

/* ---------- Balance card for dashboard ---------- */
function BalanceCard({balance}){
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-[#FF6A00] to-[#E85C00] text-white rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90">Balance</div>
            <div className="text-2xl font-semibold mt-1">{balance.currency}{balance.amount}</div>
          </div>
          <div>
            <button className="px-4 py-2 rounded-md bg-white text-[#FF6A00] font-semibold">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Mock screens ---------- */

function Header(){
  return (
    <header className="w-full border-b border-[#F0F0F0] bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <LogoSVG />
        <nav className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-[#F5F5F5]"><IconHome/></button>
          <button className="p-2 rounded-md hover:bg-[#F5F5F5]">MENU</button>
        </nav>
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0B0B0B]">Get half of Amazon's fees — with OrangeBack</h1>
            <p className="mt-2 text-[#6E6E6E]">Shop on Amazon and receive cashback — we share 50% of the commission with you.</p>
            <div className="mt-4 flex gap-3">
              <ButtonPrimary>Sign Up Free</ButtonPrimary>
              <ButtonSecondary>Learn More</ButtonSecondary>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="p-4 bg-[#FFF7F0] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-md p-2 shadow-sm">
                  <IconSearch/>
                </div>
                <div className="flex-1">
                  <input aria-label="Search products" placeholder="Search Amazon products" className="w-full bg-transparent outline-none text-sm" />
                </div>
                <ButtonPrimary>Search</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DealsGrid({products}){
  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Hot Deals</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

function ProductMock(){
  const product = {
    id: 'p1',
    title: 'Smartwatch',
    price: '199.99',
    priceCurrency: '$',
    cashbackLabel: 'Cashback $15.00',
    image: 'https://via.placeholder.com/300x300?text=Smartwatch'
  }
  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <img src={product.image} alt={product.title} className="w-full h-64 object-contain"/>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">{product.title}</h3>
          <div className="text-xl font-medium text-[#0B0B0B]">{product.priceCurrency}{product.price}</div>
          <Badge>{product.cashbackLabel}</Badge>
          <div className="mt-4">
            <ButtonPrimary>Shop with Cashback</ButtonPrimary>
          </div>
          <div className="mt-4 text-sm text-[#6E6E6E]">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus efficitur justo sed urna tincidunt, sed elementum lectus malesuada.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardMock(){
  const balance = {currency: '$', amount: '65.50'}
  const transactions = [
    {id: 't1', desc: 'Smartwatch purchase', amount: '+$15.00', status: 'confirmed'},
    {id: 't2', desc: 'Headphones purchase', amount: '+$4.00', status: 'pending'},
    {id: 't3', desc: 'Refund - Camera', amount: '-$10.00', status: 'cancelled'},
  ]

  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 gap-4">
            <BalanceCard balance={balance} />
            <Card>
              <h4 className="font-semibold mb-3">Recent Transactions</h4>
              <ul className="space-y-3">
                {transactions.map(t => (
                  <li key={t.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{t.desc}</div>
                      <div className="text-sm text-[#6E6E6E]">{t.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{t.amount}</div>
                      <div className="mt-1">{t.status === 'confirmed' ? <Badge type='success'>Confirmed</Badge> : t.status==='pending' ? <Badge type=''>{'Pending'}</Badge> : <Badge type='danger'>Cancelled</Badge>}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
        <div>
          <Card>
            <h4 className="font-semibold mb-3">Referral</h4>
            <p className="text-sm text-[#6E6E6E]">Share your link and earn extra cashback.</p>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <input className="flex-1 rounded-md border border-[#E6E6E6] px-3 py-2 text-sm" value={'https://orangeback.app/r/ABC123'} readOnly />
                <button className="px-3 py-2 rounded-md bg-[#FF6A00] text-white">Copy</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

/* ---------- Main exported demo page that shows the three screens and a small nav to swap between them ---------- */
export default function OrangeBackDemo(){
  const [screen, setScreen] = useState('home')

  const sampleProducts = Array.from({length: 8}).map((_,i)=>({
    id: 'p'+i,
    title: `Product ${i+1}`,
    price: (19.99 + i*5).toFixed(2),
    priceCurrency: '$',
    cashbackLabel: `Cashback ${(Math.random()*10+1).toFixed(2)}`,
    image: 'https://via.placeholder.com/300?text=Product'
  }))

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#0B0B0B]">
      <Header />
      <main className="pt-4 pb-12">
        {screen === 'home' && (
          <>
            <Hero />
            <DealsGrid products={sampleProducts} />
          </>
        )}

        {screen === 'product' && (
          <ProductMock />
        )}

        {screen === 'dashboard' && (
          <DashboardMock />
        )}
      </main>

      <footer className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-auto">
        <div className="bg-white rounded-full shadow-lg px-4 py-2 flex gap-6 items-center">
          <button onClick={()=>setScreen('home')} className={`flex items-center gap-2 px-3 py-2 rounded-md ${screen==='home' ? 'bg-[#FFEDD9]' : 'hover:bg-[#F5F5F5]'}`}><IconHome/><span className="text-sm">Home</span></button>
          <button onClick={()=>setScreen('product')} className={`flex items-center gap-2 px-3 py-2 rounded-md ${screen==='product' ? 'bg-[#FFEDD9]' : 'hover:bg-[#F5F5F5]'}`}><span className="text-sm">Product</span></button>
          <button onClick={()=>setScreen('dashboard')} className={`flex items-center gap-2 px-3 py-2 rounded-md ${screen==='dashboard' ? 'bg-[#FFEDD9]' : 'hover:bg-[#F5F5F5]'}`}><span className="text-sm">Dashboard</span></button>
        </div>
      </footer>
    </div>
  )
}
