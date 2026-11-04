"""Regenerates public/pdf/CV_*.pdf. Usage: python3 -m venv .venv && .venv/bin/pip install reportlab && cd public/pdf && ../../.venv/bin/python ../../scripts/cv/build_cv.py [es|en]"""
"""Builds the ES/EN CV PDFs (ATS-friendly: single column, real text, no phone/address)."""
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether, CondPageBreak

F = '/usr/share/fonts/truetype/noto/'
for name, f in [('NS', 'NotoSans-Regular.ttf'), ('NS-B', 'NotoSans-Bold.ttf'), ('NS-I', 'NotoSans-Italic.ttf'), ('NS-SB', 'NotoSans-SemiBold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, F + f))
pdfmetrics.registerFontFamily('NS', normal='NS', bold='NS-B', italic='NS-I', boldItalic='NS-B')

INK = colors.HexColor('#16152a'); MUTED = colors.HexColor('#55536e'); ACCENT = colors.HexColor('#6d28d9'); RULE = colors.HexColor('#d9d6ec')

def st(name, **kw):
    base = dict(fontName='NS', fontSize=9, leading=12.6, textColor=INK, alignment=TA_LEFT)
    base.update(kw); return ParagraphStyle(name, **base)

S_NAME = st('name', fontName='NS-B', fontSize=22, leading=26)
S_TITLE = st('title', fontName='NS-SB', fontSize=10.5, leading=14, textColor=ACCENT)
S_CONTACT = st('contact', fontSize=8.5, leading=12, textColor=MUTED)
S_H = st('h', fontName='NS-B', fontSize=9.5, leading=12, textColor=ACCENT, spaceBefore=9, spaceAfter=2)
S_BODY = st('body')
S_ROLE = st('role', fontName='NS-B', fontSize=9.6, leading=13)
S_DATE = st('date', fontSize=8.5, leading=13, textColor=MUTED, alignment=2)
S_SUB = st('sub', fontName='NS-I', fontSize=8.7, leading=12, textColor=MUTED)
S_BUL = st('bul', leftIndent=10, bulletIndent=1, spaceBefore=1)
S_SK = st('sk', leftIndent=0)

DATA = {
 'es': dict(
  lang='Español', out='CV_Luis_Guisado_Fullstack_ES.pdf', doc_title='CV - Luis Alberto Guisado Lavañino - Desarrollador Fullstack',
  title='Desarrollador Fullstack  |  Laravel · React · TypeScript · Django · .NET',
  location='Manzanillo, Granma, Cuba · Trabajo remoto',
  h_sum='PERFIL', h_skills='HABILIDADES', h_exp='EXPERIENCIA', h_proj='PROYECTOS DESTACADOS', h_edu='FORMACIÓN', h_prev='EXPERIENCIA ANTERIOR',
  summary='Desarrollador Fullstack con 8+ años de experiencia construyendo y manteniendo sistemas en producción con Laravel, React, TypeScript, Django y .NET. Diseño APIs REST, arquitecturas limpias y microservicios, y llevo productos propios de la idea al despliegue: un marketplace local, un ERP/POS multi-almacén y apps móviles con Expo. Amplío mi perfil hacia Blockchain (Solidity, Foundry). Busco roles fullstack o backend/frontend remotos en equipos que valoren la calidad y el aprendizaje continuo.',
  skills=[('Frontend', 'React, Next.js, TypeScript, Vue, Inertia.js, Tailwind CSS, MUI, Vite'),
          ('Backend', 'PHP/Laravel, Python/Django, FastAPI, Node.js/NestJS, .NET/C#, APIs REST, JWT, microservicios'),
          ('Datos', 'PostgreSQL, MySQL/MariaDB, SQL Server, SQLite, Redis'),
          ('Móvil y escritorio', 'React Native, Expo, Flutter; Tauri y Rust (en aprendizaje)'),
          ('DevOps y calidad', 'Docker, Linux (VPS), Git, GitHub Actions, Pest, Vitest'),
          ('IA y automatización', 'Bots de Telegram, chatbots, IA generativa'),
          ('Web3 (en aprendizaje)', 'Solidity, Foundry, OpenZeppelin')],
  exp=[
   ('GIAvantech Softwares', 'Programador full stack', 'Sep 2026 – Presente', 'Joinville, Brasil · Remoto', [
     'Desarrollo frontend y backend con React, Node.js, Django y PostgreSQL.',
     'Diseño e integración de APIs REST y servicios orientados a microservicios.',
     'Integración de IA generativa y automatización de flujos con agentes y bots de Telegram.',
     'Mantenimiento y evolución de aplicaciones web en producción, con foco en rendimiento y seguridad.']),
   ('Innovasoft Colombia', 'Programador full stack', 'Feb 2026 – Mar 2026', 'Remoto', [
     'Componentes React integrados con la API y soporte de servicios .NET 5 con lógica de negocio en procedimientos almacenados de SQL Server (T-SQL).',
     'Trabajo con un equipo distribuido en Latinoamérica.']),
   ('Hospital Celia Sánchez Manduley', 'Ingeniero de software', 'Feb 2024 – Oct 2026', 'Manzanillo, Cuba', [
     'Diseño de microservicios empresariales para optimizar flujos de datos médicos.',
     'Pipelines de procesamiento asíncrono para automatizar procesos entre departamentos.',
     'Optimización de índices en bases de datos relacionales para reducir tiempos de respuesta en operaciones críticas.',
     'Herramientas internas de automatización y soporte técnico a los departamentos médicos.']),
   ('Desarrollador independiente', 'Full stack', '2022 – Presente', 'Manzanillo, Cuba', [
     'Sistemas completos para clientes privados: ERP/POS multi-almacén y marketplace en producción con Laravel y React, y tienda en línea con Next.js.',
     'Apps móviles con React Native y Expo (en desarrollo) y proyectos con Django y WordPress.',
     'Asesoría técnica y académica a estudiantes de tesis y maestría.']),
   ('Sistemas de Infraestructura Institucional', 'Desarrollador de software', 'Ago 2016 – Mar 2024', 'Manzanillo, Cuba', [
     'Refactorización de plataformas monolíticas heredadas hacia sistemas web mantenibles.',
     'Desarrollo de backend escalable con soporte seguro de alta concurrencia.'])],
  prev=[('Ministerio de Educación', 'Instructor de informática', '2011 – 2014', 'Informática, Microsoft Office y Visual Basic; formación de estudiantes avanzados.'),
        ('Ministerio de Salud', 'Desarrollador de software (prácticas)', '2008 – 2010', 'Prácticas laborales tras graduarme del IPI Rubén Bravo Álvarez.')],
  proj=[('GolfitoShop (fundador)', 'Marketplace local en producción: panel de proveedor y administración, anuncios por zona, membresías, bot de Telegram y API v1 para apps móviles. Laravel, React, Inertia, PostgreSQL.'),
        ('ERP / POS multi-almacén', 'Inventario con costo real por lote, ventas con comisiones, compras, traslados, cierre de caja por turno y multi-moneda (USD/CUP/MLC), con bot de Telegram. Laravel, React, MariaDB.'),
        ('GolfitoShop Apps (en desarrollo)', 'Apps móviles de Cliente y Panel con React Native y Expo, cliente tipado generado desde OpenAPI, notificaciones push y actualizaciones OTA con EAS.'),
        ('DayClosure (en desarrollo)', 'ERP/POS instalable y offline para escritorio y móvil, con Tauri (Rust + React) y SQLite.'),
        ('Re & Re', 'Plataforma de remesas y recargas (prueba técnica entregada). Django REST Framework, JWT, PostgreSQL y React. github.com/PushoDev/re-remesas')],
  edu=[('Universidad de Granma', 'Grado en Ingeniería', '2018 – 2022'),
       ('IPI Rubén Bravo Álvarez', 'Bachiller Técnico de Informática', '2005 – 2008')]),
 'en': dict(
  lang='English', out='CV_Luis_Guisado_Fullstack_EN.pdf', doc_title='Resume - Luis Alberto Guisado Lavañino - Fullstack Developer',
  title='Fullstack Developer  |  Laravel · React · TypeScript · Django · .NET',
  location='Manzanillo, Granma, Cuba · Remote work',
  h_sum='SUMMARY', h_skills='SKILLS', h_exp='EXPERIENCE', h_proj='SELECTED PROJECTS', h_edu='EDUCATION', h_prev='EARLIER EXPERIENCE',
  summary='Fullstack developer with 8+ years of experience building and maintaining production systems with Laravel, React, TypeScript, Django and .NET. I design REST APIs, clean architectures and microservices, and take my own products from idea to deployment: a local marketplace, a multi-warehouse ERP/POS and mobile apps with Expo. I am expanding into Blockchain (Solidity, Foundry). Looking for remote fullstack or backend/frontend roles on teams that value quality and continuous learning.',
  skills=[('Frontend', 'React, Next.js, TypeScript, Vue, Inertia.js, Tailwind CSS, MUI, Vite'),
          ('Backend', 'PHP/Laravel, Python/Django, FastAPI, Node.js/NestJS, .NET/C#, REST APIs, JWT, microservices'),
          ('Data', 'PostgreSQL, MySQL/MariaDB, SQL Server, SQLite, Redis'),
          ('Mobile & desktop', 'React Native, Expo, Flutter; Tauri and Rust (learning)'),
          ('DevOps & quality', 'Docker, Linux (VPS), Git, GitHub Actions, Pest, Vitest'),
          ('AI & automation', 'Telegram bots, chatbots, generative AI'),
          ('Web3 (learning)', 'Solidity, Foundry, OpenZeppelin')],
  exp=[
   ('GIAvantech Softwares', 'Full stack developer', 'Sep 2026 – Present', 'Joinville, Brazil · Remote', [
     'Frontend and backend development with React, Node.js, Django and PostgreSQL.',
     'Design and integration of REST APIs and microservice-oriented services.',
     'Integration of generative AI and workflow automation through agents and Telegram bots.',
     'Maintenance and evolution of production web applications, focused on performance and security.']),
   ('Innovasoft Colombia', 'Full stack developer', 'Feb 2026 – Mar 2026', 'Remote', [
     'React components integrated with the API, and support for .NET 5 services with business logic in SQL Server stored procedures (T-SQL).',
     'Worked with a team distributed across Latin America.']),
   ('Hospital Celia Sánchez Manduley', 'Software engineer', 'Feb 2024 – Oct 2026', 'Manzanillo, Cuba', [
     'Designed enterprise microservices to streamline medical data flows.',
     'Built asynchronous processing pipelines to automate processes across departments.',
     'Optimized indexing in relational databases, reducing response times in critical operations.',
     'Internal automation tools and technical support for medical departments.']),
   ('Independent developer', 'Full stack', '2022 – Present', 'Manzanillo, Cuba', [
     'End-to-end systems for private clients: a multi-warehouse ERP/POS and a marketplace in production with Laravel and React, plus an online store with Next.js.',
     'Mobile apps with React Native and Expo (in development) and projects with Django and WordPress.',
     'Technical and academic advising for thesis and master\'s students.']),
   ('Sistemas de Infraestructura Institucional', 'Software developer', 'Aug 2016 – Mar 2024', 'Manzanillo, Cuba', [
     'Refactored legacy monolithic platforms into maintainable web systems.',
     'Developed scalable backend solutions with safe support for high concurrency.'])],
  prev=[('Ministry of Education', 'IT instructor', '2011 – 2014', 'Computer science, Microsoft Office and Visual Basic; trained advanced students.'),
        ('Ministry of Health', 'Software developer (internship)', '2008 – 2010', 'Work placement after graduating from IPI Rubén Bravo Álvarez.')],
  proj=[('GolfitoShop (founder)', 'Local marketplace in production: provider and admin panel, zone-based ads, memberships, Telegram bot and an API v1 for mobile apps. Laravel, React, Inertia, PostgreSQL.'),
        ('Multi-warehouse ERP / POS', 'Inventory with real per-batch cost, sales with commissions, purchasing, transfers, shift-based cash closing and multi-currency (USD/CUP/MLC), with a Telegram bot. Laravel, React, MariaDB.'),
        ('GolfitoShop Apps (in development)', 'Customer and Panel mobile apps with React Native and Expo, a typed client generated from OpenAPI, push notifications and OTA updates with EAS.'),
        ('DayClosure (in development)', 'Installable, offline ERP/POS for desktop and mobile, with Tauri (Rust + React) and SQLite.'),
        ('Re & Re', 'Remittance and top-up platform (delivered technical test). Django REST Framework, JWT, PostgreSQL and React. github.com/PushoDev/re-remesas')],
  edu=[('University of Granma', 'Engineering degree', '2018 – 2022'),
       ('IPI Rubén Bravo Álvarez', 'Technical Baccalaureate in Computer Science', '2005 – 2008')]),
}

def esc(t): return t.replace('&', '&amp;')

def build(code):
    d = DATA[code]
    doc = SimpleDocTemplate(d['out'], pagesize=A4, leftMargin=16*mm, rightMargin=16*mm, topMargin=13*mm, bottomMargin=12*mm,
                            title=d['doc_title'], author='Luis Alberto Guisado Lavañino', subject='CV')
    W = A4[0] - 32*mm - 12  # frame has 6pt padding on each side
    L = []
    L += [Paragraph('Luis Alberto Guisado Lavañino', S_NAME), Paragraph(esc(d['title']), S_TITLE), Spacer(1, 3)]
    link = lambda u, t: f'<link href="{u}" color="#6d28d9">{t}</link>'
    L.append(Paragraph(f"{d['location']}<br/>"
        f"{link('mailto:bethocubans1990@gmail.com','bethocubans1990@gmail.com')}  ·  {link('https://pushodev.vercel.app','pushodev.vercel.app')}  ·  "
        f"{link('https://www.linkedin.com/in/luis-alberto-pushodev/','linkedin.com/in/luis-alberto-pushodev')}  ·  {link('https://github.com/PushoDev','github.com/PushoDev')}", S_CONTACT))
    def head(t):
        return [CondPageBreak(38*mm), Paragraph(t, S_H), HRFlowable(width='100%', thickness=0.6, color=RULE, spaceAfter=4)]
    L += head(d['h_sum']) + [Paragraph(esc(d['summary']), S_BODY)]
    L += head(d['h_skills'])
    sk = Table([[Paragraph(f'<b>{k}</b>', S_SK), Paragraph(esc(v), S_SK)] for k, v in d['skills']], colWidths=[38*mm, W - 38*mm])
    sk.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 4), ('TOPPADDING', (0,0), (-1,-1), 1), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    L.append(sk)
    L += head(d['h_exp'])
    for org, role, dates, place, buls in d['exp']:
        top = Table([[Paragraph(f'{esc(org)} — <font name="NS" color="#55536e">{esc(role)}</font>', S_ROLE), Paragraph(dates, S_DATE)]], colWidths=[W - 38*mm, 38*mm])
        top.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
        block = [top, Paragraph(esc(place), S_SUB)] + [Paragraph(esc(b), S_BUL, bulletText='•') for b in buls] + [Spacer(1, 5)]
        L.append(KeepTogether(block))
    L += head(d['h_prev'])
    for org, role, dates, desc in d['prev']:
        top = Table([[Paragraph(f'{esc(org)} — <font name="NS" color="#55536e">{esc(role)}</font>', S_ROLE), Paragraph(dates, S_DATE)]], colWidths=[W - 38*mm, 38*mm])
        top.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
        L.append(KeepTogether([top, Paragraph(esc(desc), S_BODY), Spacer(1, 4)]))
    L += head(d['h_proj'])
    for name, desc in d['proj']:
        L.append(KeepTogether([Paragraph(f'<b>{esc(name)}</b> — {esc(desc)}', S_BUL, bulletText='•')]))
    L += head(d['h_edu'])
    for org, deg, dates in d['edu']:
        t = Table([[Paragraph(f'<b>{esc(org)}</b> — {esc(deg)}', S_BODY), Paragraph(dates, S_DATE)]], colWidths=[W - 38*mm, 38*mm])
        t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 1), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
        L.append(t)
    doc.build(L)

if __name__ == '__main__':
    for c in sys.argv[1:] or ['es', 'en']:
        build(c)
