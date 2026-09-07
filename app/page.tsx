'use client'

import { useMemo, useState } from 'react'

type Option = { name: string; value: string; detail?: string }

const options: Record<string, Option[]> = {
  color: [
    { name: 'Ink', value: '#171817' },
    { name: 'Cobalt', value: '#3157d6' },
    { name: 'Sage', value: '#71836f' },
    { name: 'Tangerine', value: '#db6c3e' },
  ],
  lens: [
    { name: 'Smoke', value: '#687278' },
    { name: 'Ocean', value: '#3d7194' },
    { name: 'Tea', value: '#9a6947' },
    { name: 'Clear', value: '#b4c2c6' },
  ],
  size: [
    { name: 'Petite', value: 'petite', detail: '48 mm' },
    { name: 'Classic', value: 'classic', detail: '52 mm' },
    { name: 'Oversize', value: 'oversize', detail: '56 mm' },
  ],
  style: [
    { name: 'Pavilion', value: 'pavilion', detail: 'Soft square' },
    { name: 'Aviator', value: 'aviator', detail: 'Double bridge' },
    { name: 'Round', value: 'round', detail: 'Full circle' },
  ],
  material: [
    { name: 'Acetate', value: 'acetate', detail: 'Polished' },
    { name: 'Titanium', value: 'titanium', detail: 'Brushed' },
  ],
}

const labels: Record<string, string> = { color: 'Frame color', lens: 'Lens tint', size: 'Fit', style: 'Silhouette', material: 'Material' }

export default function HomePage() {
  const [choice, setChoice] = useState({ color: 'Ink', lens: 'Smoke', size: 'classic', style: 'pavilion', material: 'acetate' })
  const [saved, setSaved] = useState(false)
  const frame = options.color.find((item) => item.name === choice.color) ?? options.color[0]
  const lens = options.lens.find((item) => item.name === choice.lens) ?? options.lens[0]
  const selectedStyle = options.style.find((item) => item.value === choice.style) ?? options.style[0]
  const selectedSize = options.size.find((item) => item.value === choice.size) ?? options.size[1]
  const price = useMemo(() => 168 + (choice.material === 'titanium' ? 74 : 0) + (choice.size === 'oversize' ? 12 : 0), [choice])

  function select(group: string, value: string) {
    setChoice((current) => ({ ...current, [group]: value }))
    setSaved(false)
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">S</span><span>sunbeam</span></div>
        <span className="step-label">Custom studio <span className="step-dot" /></span>
      </header>

      <section className="hero-copy">
        <p className="eyebrow">Your point of view</p>
        <h1>Make a pair<br /><em>your own.</em></h1>
        <p className="intro">Every Sunbeam starts with a frame. Shape the rest around you.</p>
      </section>

      <section className="preview-card" aria-label="Live sunglasses preview">
        <div className="preview-top"><span>LIVE PREVIEW</span><span className="preview-status"><i /> Updating in real time</span></div>
        <div className={`glasses-stage style-${choice.style} size-${choice.size}`}>
          <div className="sun-disc" />
          <div className="glasses">
            <div className="bridge" style={{ backgroundColor: frame.value }} />
            <div className="lens lens-left" style={{ borderColor: frame.value, backgroundColor: lens.value }}><span /></div>
            <div className="lens lens-right" style={{ borderColor: frame.value, backgroundColor: lens.value }}><span /></div>
            <div className="arm arm-left" style={{ backgroundColor: frame.value }} /><div className="arm arm-right" style={{ backgroundColor: frame.value }} />
          </div>
          <p className="preview-name">{frame.name} / {selectedStyle.name}</p>
        </div>
        <div className="preview-footer"><span>{selectedSize.detail} fit</span><span>{choice.material === 'titanium' ? 'Lightweight titanium' : 'Italian acetate'}</span></div>
      </section>

      <section className="controls" aria-label="Sunglasses customisation controls">
        {(['color', 'lens', 'size', 'style', 'material'] as const).map((group) => (
          <fieldset className="control-group" key={group}>
            <legend><span>{labels[group]}</span><small>{group === 'color' ? choice.color : group === 'lens' ? choice.lens : group === 'size' ? selectedSize.name : group === 'style' ? selectedStyle.name : choice.material === 'titanium' ? 'Titanium' : 'Acetate'}</small></legend>
            <div className={`option-row option-${group}`}>
              {options[group].map((item) => (
                <button className={`option ${((group === 'color' && choice.color === item.name) || (group === 'lens' && choice.lens === item.name) || choice[group] === item.value) ? 'selected' : ''}`} key={item.value} onClick={() => select(group, group === 'color' || group === 'lens' ? item.name : item.value)} aria-pressed={((group === 'color' && choice.color === item.name) || (group === 'lens' && choice.lens === item.name) || choice[group] === item.value)}>
                  {group === 'color' || group === 'lens' ? <span className="swatch" style={{ backgroundColor: item.value }} /> : <span className="option-name">{item.name}</span>}
                  {item.detail && <small>{item.detail}</small>}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </section>

      <section className="summary">
        <div><span className="summary-label">Your Sunbeam</span><strong>{frame.name} {selectedStyle.name}</strong><p>{choice.material === 'titanium' ? 'Titanium' : 'Acetate'} · {lens.name} lenses · {selectedSize.name} fit</p></div>
        <div className="summary-price"><span>From</span><strong>${price}</strong></div>
      </section>
      <div className="actions"><button className="reset" onClick={() => setChoice({ color: 'Ink', lens: 'Smoke', size: 'classic', style: 'pavilion', material: 'acetate' })}>Reset</button><button className="save" onClick={() => setSaved(true)}>{saved ? 'Saved to your studio' : 'Save your design'} <span>↗</span></button></div>
      <p className="fine-print">Free shipping · 30-day returns · Made to order</p>
    </main>
  )
}
