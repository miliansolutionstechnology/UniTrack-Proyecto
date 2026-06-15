from pathlib import Path
import re

file_path = Path('src/app/pages/home/home.component.ts')
text = file_path.read_text(encoding='utf-8')

replacements = {
    'Ingeniería en Sistemas de Información': [
        "{ semestre: 1, cursos: ['Programación I', 'Matemática Discreta', 'Estructuras de Datos', 'Algoritmos y Programación', 'Lógica Computacional'] },",
        "{ semestre: 2, cursos: ['Bases de Datos', 'Arquitectura de Computadores', 'Sistemas Operativos', 'Redes de Computadoras', 'Ingeniería de Software'] },",
        "{ semestre: 3, cursos: ['Análisis de Algoritmos', 'Programación Web', 'Bases de Datos Avanzadas', 'Inteligencia Artificial', 'Diseño de Interfaces'] },",
        "{ semestre: 4, cursos: ['Desarrollo de Aplicaciones', 'Gestión de Proyectos', 'Seguridad Informática', 'Sistemas Distribuidos', 'Bases de Datos Distribuidas'] },",
        "{ semestre: 5, cursos: ['Computación Móvil', 'Cloud Computing', 'Pruebas de Software', 'Ingeniería de Requisitos', 'Redes Avanzadas'] },",
        "{ semestre: 6, cursos: ['Programación Paralela', 'DevOps', 'Aprendizaje Automático', 'Criptografía', 'Sistemas Embebidos'] },",
        "{ semestre: 7, cursos: ['Arquitectura de Software', 'Internet de las Cosas', 'Gestión de Datos', 'Análisis de Big Data', 'Ética en TI'] },",
        "{ semestre: 8, cursos: ['Gestión de Servicios TI', 'Inteligencia de Negocios', 'Ciberseguridad', 'Integración Continua', 'Diseño de Experiencia de Usuario'] },",
        "{ semestre: 9, cursos: ['Proyectos de Software', 'Administración de Bases de Datos', 'Machine Learning Avanzado', 'Gestión de Calidad', 'Sistemas de Información'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Emprendimiento Tecnológico', 'Auditoría de Sistemas', 'Simulación de Procesos', 'Investigación en TI'] }"
    ],
    'Ingeniería Industrial': [
        "{ semestre: 1, cursos: ['Cálculo I', 'Metrología', 'Gestión de la Producción', 'Estadística Aplicada', 'Dibujo Técnico'] },",
        "{ semestre: 2, cursos: ['Ingeniería de Métodos', 'Seguridad Industrial', 'Logística', 'Economía Industrial', 'Investigación de Operaciones'] },",
        "{ semestre: 3, cursos: ['Planeación de la Producción', 'Calidad', 'Control Estadístico', 'Sistemas Lean', 'Ergonomía'] },",
        "{ semestre: 4, cursos: ['Ingeniería de Planta', 'Gestión de Proyectos', 'Financiamiento Industrial', 'Materiales Industriales', 'Gestión de Mantenimiento'] },",
        "{ semestre: 5, cursos: ['Cadena de Suministro', 'Sistemas de Inventario', 'Ingeniería de Costos', 'Simulación de Procesos', 'Desarrollo Sostenible'] },",
        "{ semestre: 6, cursos: ['Automatización Industrial', 'Gestión de Calidad Total', 'Gestión de Riesgos', 'Mecánica de Fluidos', 'Gestión Ambiental'] },",
        "{ semestre: 7, cursos: ['Mejora Continua', 'Ingeniería de Procesos', 'Gestión de la Innovación', 'Diseño de Plantas', 'Control de Calidad'] },",
        "{ semestre: 8, cursos: ['Gestión de Operaciones', 'Diseño de Sistemas', 'Investigación de Operaciones Avanzada', 'Seguridad y Salud Ocupacional', 'Ingeniería de Producción'] },",
        "{ semestre: 9, cursos: ['Sistemas Integrados de Gestión', 'Lean Manufacturing', 'Modelos de Decisión', 'Gestión de Proyectos Avanzados', 'Auditoría Industrial'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Ingeniería Logística', 'Gestión Estratégica', 'Sistemas Energéticos', 'Ética Profesional'] }"
    ],
    'Ingeniería Civil': [
        "{ semestre: 1, cursos: ['Resistencia de Materiales', 'Topografía', 'Hormigón Armado', 'Dibujo de Ingeniería', 'Mecánica de Materiales'] },",
        "{ semestre: 2, cursos: ['Diseño Estructural', 'Geotecnia', 'Sistemas de Transporte', 'Construcción de Caminos', 'Gestión de Proyectos'] },",
        "{ semestre: 3, cursos: ['Hidráulica', 'Materiales de Construcción', 'Análisis de Estructuras', 'Diseño Arquitectónico', 'Cimentaciones'] },",
        "{ semestre: 4, cursos: ['Mecánica de Suelos', 'Construcción Metálica', 'Planificación de Obras', 'Presupuestos', 'Gestión de Calidad'] },",
        "{ semestre: 5, cursos: ['Geotecnia Avanzada', 'Ingeniería Ambiental', 'Sismología', 'Tecnología de la Construcción', 'Sistemas de Distribución'] },",
        "{ semestre: 6, cursos: ['Gestión de Contratos', 'Obras Hidráulicas', 'Gestión del Tránsito', 'Túneles y Puentes', 'Seguridad en la Construcción'] },",
        "{ semestre: 7, cursos: ['Gestión de Proyectos Avanzados', 'Construcción Sostenible', 'Modelado BIM', 'Evaluación de Riesgos', 'Control de Costos'] },",
        "{ semestre: 8, cursos: ['Diseño de Infraestructura', 'Ingeniería Sanitaria', 'Transporte Urbano', 'Planeamiento Urbano', 'Administración de Obras'] },",
        "{ semestre: 9, cursos: ['Estimación de Costos', 'Patología de la Construcción', 'Supervisión de Obras', 'Ética Profesional', 'Trabajo Final I'] },",
        "{ semestre: 10, cursos: ['Trabajo Final II', 'Legislación de la Construcción', 'Gestión de Calidad en Proyectos', 'Innovación Constructiva', 'Gestión de Mantenimiento'] }"
    ],
    'Administración de Empresas': [
        "{ semestre: 1, cursos: ['Contabilidad I', 'Economía General', 'Marketing', 'Estadística Empresarial', 'Comportamiento Organizacional'] },",
        "{ semestre: 2, cursos: ['Finanzas Corporativas', 'Gestión de Recursos Humanos', 'Derecho Empresarial', 'Planificación Estratégica', 'Mercadotecnia Digital'] },",
        "{ semestre: 3, cursos: ['Contabilidad de Costos', 'Administración Financiera', 'Investigación de Mercados', 'Sistemas de Información Gerencial', 'Comercio Internacional'] },",
        "{ semestre: 4, cursos: ['Gestión de Operaciones', 'Liderazgo', 'Negociación', 'Logística Empresarial', 'Emprendimiento'] },",
        "{ semestre: 5, cursos: ['Gestión de Calidad', 'Comportamiento Organizacional Avanzado', 'Marketing Estratégico', 'Análisis Financiero', 'Ética Empresarial'] },",
        "{ semestre: 6, cursos: ['Gestión de Proyectos', 'Comunicación Corporativa', 'Economía Gerencial', 'Control de Gestión', 'Innovación Empresarial'] },",
        "{ semestre: 7, cursos: ['Finanzas Internacionales', 'Gestión del Talento', 'Estrategia de Marca', 'Gobierno Corporativo', 'Responsabilidad Social'] },",
        "{ semestre: 8, cursos: ['Inteligencia de Negocios', 'Planificación Tributaria', 'Gestión del Cambio', 'Comercio Electrónico', 'Gestión de Riesgos'] },",
        "{ semestre: 9, cursos: ['Consultoría Empresarial', 'Auditoría Interna', 'Negocios Internacionales', 'Simulación Empresarial', 'Gestión de la Innovación'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Emprendimiento Empresarial', 'Sistemas Integrados de Gestión', 'Seminario de Investigación', 'Desarrollo Profesional'] }"
    ],
    'Auditoría': [
        "{ semestre: 1, cursos: ['Contabilidad II', 'Auditoría Financiera', 'Legislación Comercial', 'Contabilidad de Costos', 'Ética Profesional'] },",
        "{ semestre: 2, cursos: ['Control Interno', 'Ética Profesional', 'Normas Internacionales', 'Auditoría de Sistemas', 'Gestión de Riesgos'] },",
        "{ semestre: 3, cursos: ['Auditoría de Costos', 'Auditoría de Gestión', 'Derecho Tributario', 'Finanzas Corporativas', 'Normas de Información Financiera'] },",
        "{ semestre: 4, cursos: ['Auditoría Externa', 'Auditoría Interna', 'Gestión de la Calidad', 'Fraude Corporativo', 'Sistemas de Control'] },",
        "{ semestre: 5, cursos: ['Auditoría Forense', 'Evaluación de Riesgos', 'Gobierno Corporativo', 'Ética Profesional Avanzada', 'Auditoría de TI'] },",
        "{ semestre: 6, cursos: ['Auditoría de Sustentabilidad', 'Auditoría de Procesos', 'Impuestos', 'Gestión de Proyectos', 'Análisis Financiero'] },",
        "{ semestre: 7, cursos: ['Auditoría Internacional', 'Consultoría', 'Control de Gestión', 'Normas Internacionales de Auditoría', 'Gestión de la Información'] },",
        "{ semestre: 8, cursos: ['Auditoría de Estados Financieros', 'Auditoría de Costos', 'Modelos de Decisión', 'Gestión de Riesgos Avanzada', 'Auditoría de Gobierno Corporativo'] },",
        "{ semestre: 9, cursos: ['Auditoría de Proyectos', 'Evaluación de Controles', 'Ética Aplicada', 'Negocios Internacionales', 'Auditoría de Procesos'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Auditoría Estratégica', 'Gestión del Conocimiento', 'Seminario de Investigación', 'Sistemas de Auditoría'] }"
    ],
    'Economía': [
        "{ semestre: 1, cursos: ['Microeconomía', 'Macroeconomía', 'Estadística', 'Matemáticas Financieras', 'Economía Internacional'] },",
        "{ semestre: 2, cursos: ['Econometría', 'Política Económica', 'Desarrollo Económico', 'Teoría del Consumidor', 'Economía Pública'] },",
        "{ semestre: 3, cursos: ['Economía del Trabajo', 'Economía Regional', 'Finanzas Públicas', 'Historia del Pensamiento Económico', 'Economía Ambiental'] },",
        "{ semestre: 4, cursos: ['Economía de la Empresa', 'Modelos Macroeconómicos', 'Economía Monetaria', 'Desarrollo Sostenible', 'Investigación Cuantitativa'] },",
        "{ semestre: 5, cursos: ['Economía Internacional Avanzada', 'Análisis de Políticas', 'Economía de la Salud', 'Economía del Desarrollo', 'Gestión de Proyectos'] },",
        "{ semestre: 6, cursos: ['Economía Financiera', 'Economía del Sector Público', 'Seminario de Investigación', 'Comercio Exterior', 'Economía del Consumo'] },",
        "{ semestre: 7, cursos: ['Política Fiscal', 'Economía de la Globalización', 'Investigación Económica Avanzada', 'Economía del Trabajo Avanzada', 'Economía Urbana'] },",
        "{ semestre: 8, cursos: ['Estadística Avanzada', 'Econometría Aplicada', 'Negocios Internacionales', 'Evaluación de Proyectos', 'Economía Industrial'] },",
        "{ semestre: 9, cursos: ['Gestión del Desarrollo', 'Teoría de Juegos', 'Análisis de Datos Económicos', 'Mercados Internacionales', 'Ética en Economía'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Seminario de Investigación', 'Economía Digital', 'Sistemas de Información Económica', 'Política Económica Avanzada'] }"
    ],
    'Psicología': [
        "{ semestre: 1, cursos: ['Introducción a la Psicología', 'Psicología Social', 'Psicopatología', 'Neurociencia Básica', 'Métodos de Investigación'] },",
        "{ semestre: 2, cursos: ['Evaluación Psicológica', 'Intervención Terapéutica', 'Psicología del Desarrollo', 'Psicología Clínica', 'Ética Profesional'] },",
        "{ semestre: 3, cursos: ['Psicología Educativa', 'Psicología Organizacional', 'Terapia Cognitiva', 'Comunicación Interpersonal', 'Neuropsicología'] },",
        "{ semestre: 4, cursos: ['Psicología del Aprendizaje', 'Psicología de la Personalidad', 'Técnicas de Evaluación', 'Psicometría', 'Salud Mental'] },",
        "{ semestre: 5, cursos: ['Atención Primaria', 'Terapias de Grupo', 'Psicología Forense', 'Intervención Familiar', 'Ética en Salud Mental'] },",
        "{ semestre: 6, cursos: ['Psicología de la Motivación', 'Terapia Psicológica Avanzada', 'Investigación Psicológica', 'Coaching', 'Psicología Social Avanzada'] },",
        "{ semestre: 7, cursos: ['Psicología Organizacional Avanzada', 'Psicología Comunitaria', 'Gestión de la Diversidad', 'Psicología de la Salud', 'Evaluación de Programas'] },",
        "{ semestre: 8, cursos: ['Neuropsicología Clínica', 'Psicología de la Intervención', 'Psicología del Deporte', 'Investigación Clínica', 'Ética y Derechos Humanos'] },",
        "{ semestre: 9, cursos: ['Seminario de Intervención', 'Psicología del Desarrollo Avanzada', 'Psicología del Longevidad', 'Terapias Alternativas', 'Gestión de Casos'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Investigación en Psicología', 'Seminario de Ética', 'Terapias de Tercera Generación', 'Promoción de la Salud Mental'] }"
    ],
    'Sociología': [
        "{ semestre: 1, cursos: ['Teoría Sociológica', 'Sociología del Trabajo', 'Métodos Cualitativos', 'Cultura y Sociedad', 'Sociología Urbana'] },",
        "{ semestre: 2, cursos: ['Cultura y Sociedad', 'Análisis de las Instituciones', 'Sociología Política', 'Demografía', 'Medios y Sociedad'] },",
        "{ semestre: 3, cursos: ['Sociología del Género', 'Globalización', 'Movimientos Sociales', 'Sociología del Consumo', 'Etnografía Avanzada'] },",
        "{ semestre: 4, cursos: ['Sociología Rural', 'Desarrollo Comunitario', 'Investigación Social', 'Política Pública', 'Sociología Digital'] },",
        "{ semestre: 5, cursos: ['Teoría Social Avanzada', 'Sociología Ambiental', 'Mercado Laboral', 'Sociología de la Educación', 'Cultura Popular'] },",
        "{ semestre: 6, cursos: ['Sociología de la Religión', 'Sociología de la Salud', 'Población y Migración', 'Técnicas de Investigación', 'Sociología del Poder'] },",
        "{ semestre: 7, cursos: ['Sociología de la Ciudad', 'Sociología de los Medios', 'Sociología de las Organizaciones', 'Comunicación Social', 'Análisis Crítico'] },",
        "{ semestre: 8, cursos: ['Sociología de la Innovación', 'Evaluación de Políticas', 'Métodos Cuantitativos Avanzados', 'Sociología del Trabajo Avanzada', 'Seminario de Investigación'] },",
        "{ semestre: 9, cursos: ['Responsabilidad Social', 'Sociología del Desarrollo', 'Sociología del Consumo Avanzada', 'Gestión de Proyectos Sociales', 'Ética Social'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Investigación Social Avanzada', 'Seminario de Ética', 'Proyectos Sociales', 'Gestión Cultural'] }"
    ],
    'Filosofía': [
        "{ semestre: 1, cursos: ['Historia de la Filosofía', 'Lógica', 'Ética', 'Filosofía Antigua', 'Metafísica'] },",
        "{ semestre: 2, cursos: ['Filosofía Contemporánea', 'Filosofía Política', 'Estética', 'Filosofía del Lenguaje', 'Ética Aplicada'] },",
        "{ semestre: 3, cursos: ['Filosofía de la Ciencia', 'Epistemología', 'Filosofía del Derecho', 'Filosofía de la Mente', 'Filosofía de la Religión'] },",
        "{ semestre: 4, cursos: ['Filosofía del Arte', 'Fenomenología', 'Hermenéutica', 'Lógica Avanzada', 'Filosofía Social'] },",
        "{ semestre: 5, cursos: ['Filosofía Política Avanzada', 'Ética Profesional', 'Estética Contemporánea', 'Teoría Crítica', 'Filosofía Analítica'] },",
        "{ semestre: 6, cursos: ['Filosofía de la Cultura', 'Filosofía de la Historia', 'Pensamiento Latinoamericano', 'Filosofía de la Ciencia Social', 'Investigación Filosófica'] },",
        "{ semestre: 7, cursos: ['Filosofía del Derecho Avanzada', 'Filosofía de la Educación', 'Filosofía de la Tecnología', 'Filosofía Sexual', 'Filosofía del Lenguaje Avanzada'] },",
        "{ semestre: 8, cursos: ['Estudios de Ética Aplicada', 'Filosofía Política Comparada', 'Seminario Filosófico', 'Teorías de la Justicia', 'Filosofía Práctica'] },",
        "{ semestre: 9, cursos: ['Filosofía de la Mente Avanzada', 'Filosofía de la Ciencia Avanzada', 'Investigación Filosófica Avanzada', 'Filosofía y Sociedad', 'Seminario de Trabajo Final'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Seminario de Ética', 'Filosofía Contemporánea Avanzada', 'Proyecto de Investigación', 'Taller de Ensayo Filosófico'] }"
    ],
    'Medicina': [
        "{ semestre: 1, cursos: ['Anatomía', 'Fisiología', 'Bioquímica', 'Microbiología', 'Introducción a la Medicina'] },",
        "{ semestre: 2, cursos: ['Patología', 'Clínica Médica', 'Farmacología', 'Inmunología', 'Salud Pública'] },",
        "{ semestre: 3, cursos: ['Fisiopatología', 'Diagnóstico Médico', 'Semiología', 'Anestesiología', 'Ética Médica'] },",
        "{ semestre: 4, cursos: ['Pediatría', 'Patología General', 'Microbiología Clínica', 'Nutrición', 'Salud Comunitaria'] },",
        "{ semestre: 5, cursos: ['Medicina Interna', 'Cirugía General', 'Ginecología y Obstetricia', 'Psiquiatría', 'Farmacología Clínica'] },",
        "{ semestre: 6, cursos: ['Urgencias Médicas', 'Endocrinología', 'Nefrología', 'Especialidades Médicas', 'Epidemiología'] },",
        "{ semestre: 7, cursos: ['Medicina Familiar', 'Cardiología', 'Neurología', 'Infectología', 'Gestión Sanitaria'] },",
        "{ semestre: 8, cursos: ['Oncología', 'Dermatología', 'Rehabilitación', 'Cirugía Especializada', 'Investigación Clínica'] },",
        "{ semestre: 9, cursos: ['Rotación Clínica', 'Seminario Médico', 'Ética y Legislación', 'Gestión de la Salud', 'Investigación Profesional'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Tesis Médica', 'Seminario de Investigación', 'Salud Global', 'Gestión Hospitalaria'] }"
    ],
    'Enfermería': [
        "{ semestre: 1, cursos: ['Anatomía Humana', 'Cuidados de Enfermería', 'Farmacología', 'Salud Comunitaria', 'Nutrición'] },",
        "{ semestre: 2, cursos: ['Salud Comunitaria', 'Práctica Clínica', 'Ética en Enfermería', 'Gestión del Cuidado', 'Enfermería Pediátrica'] },",
        "{ semestre: 3, cursos: ['Enfermería Médico-Quirúrgica', 'Salud Mental', 'Cuidados de Maternidad', 'Promoción de la Salud', 'Gestión del Dolor'] },",
        "{ semestre: 4, cursos: ['Gestión de Enfermería', 'Investigación en Enfermería', 'Nutrición Clínica', 'Cuidado Crítico', 'Ética y Legislación'] },",
        "{ semestre: 5, cursos: ['Cuidado Comunitario', 'Enfermería Geriátrica', 'Rehabilitación', 'Gestión del Cuidado Continuo', 'Salud Pública'] },",
        "{ semestre: 6, cursos: ['Enfermería de Urgencias', 'Administración de Servicios', 'Educación para la Salud', 'Investigación Aplicada', 'Tecnología en Enfermería'] },",
        "{ semestre: 7, cursos: ['Enfermería en Salud Mental', 'Gestión de Calidad', 'Cuidados Paliativos', 'Ética Profesional Avanzada', 'Innovación en Enfermería'] },",
        "{ semestre: 8, cursos: ['Prácticas Supervisadas', 'Gestión de Casos', 'Salud Comunitaria Avanzada', 'Enfermería Digital', 'Promoción de la Salud'] },",
        "{ semestre: 9, cursos: ['Seminario de Práctica', 'Investigación en Enfermería', 'Ética en Salud', 'Gestión de Servicios', 'Trabajo Final I'] },",
        "{ semestre: 10, cursos: ['Trabajo Final II', 'Seminario de Investigación', 'Gestión de Proyectos en Enfermería', 'Ética Profesional', 'Desarrollo Profesional'] }"
    ],
    'Fisioterapia': [
        "{ semestre: 1, cursos: ['Biomecánica', 'Cinesiología', 'Terapia Manual', 'Anatomía Funcional', 'Rehabilitación Básica'] },",
        "{ semestre: 2, cursos: ['Rehabilitación', 'Fisioterapia Respiratoria', 'Fisioterapia Neurológica', 'Control Motor', 'Terapia Física Avanzada'] },",
        "{ semestre: 3, cursos: ['Fisioterapia Deportiva', 'Electroterapia', 'Reeducación Postural', 'Kinesiología', 'Evaluación Funcional'] },",
        "{ semestre: 4, cursos: ['Fisioterapia Ortopédica', 'Neurología', 'Gerontología', 'Investigación en Fisioterapia', 'Terapias Manuales Avanzadas'] },",
        "{ semestre: 5, cursos: ['Fisioterapia Respiratoria Avanzada', 'Rehabilitación Cardiaca', 'Fisioterapia Pediátrica', 'Análisis de Movimiento', 'Gestión de Servicios de Fisioterapia'] },",
        "{ semestre: 6, cursos: ['Rehabilitación Neurológica', 'Fisioterapia de la Columna', 'Práctica Clínica', 'Tecnologías en Fisioterapia', 'Ética Profesional'] },",
        "{ semestre: 7, cursos: ['Fisioterapia en Oncología', 'Terapias de Rehabilitación Avanzada', 'Gestión de Casos', 'Investigación Clínica', 'Salud y Bienestar'] },",
        "{ semestre: 8, cursos: ['Fisioterapia Comunitaria', 'Rehabilitación Física', 'Seminario Profesional', 'Gestión de Servicios', 'Trabajo Final I'] },",
        "{ semestre: 9, cursos: ['Trabajo Final II', 'Investigación en Fisioterapia', 'Dirección de Equipos', 'Salud Ocupacional', 'Docencia en Fisioterapia'] },",
        "{ semestre: 10, cursos: ['Seminario de Investigación Avanzada', 'Desarrollo Profesional', 'Ética Profesional', 'Gestión de Proyectos', 'Seminario de Trabajo Final'] }"
    ],
    'Trabajo Social': [
        "{ semestre: 1, cursos: ['Intervención Comunitaria', 'Política Social', 'Metodología de la Investigación', 'Derechos Humanos', 'Psicología Social'] },",
        "{ semestre: 2, cursos: ['Taller de Gestión Social', 'Derechos Humanos', 'Trabajo Social con Familias', 'Evaluación de Programas', 'Comunicación Social'] },",
        "{ semestre: 3, cursos: ['Trabajo Social en Contextos Urbanos', 'Gestión de Proyectos Sociales', 'Protección Social', 'Ética Profesional', 'Liderazgo Social'] },",
        "{ semestre: 4, cursos: ['Gestión Comunitaria', 'Intervención Familiar', 'Políticas Públicas', 'Desarrollo Social', 'Investigación Social'] },",
        "{ semestre: 5, cursos: ['Trabajo Social en Salud', 'Gestión de Riesgos', 'Atención a la Población Vulnerable', 'Evaluación de Impacto', 'Formación en Derechos Humanos'] },",
        "{ semestre: 6, cursos: ['Diseño de Programas Sociales', 'Gestión de la Diversidad', 'Trabajo Social Educativo', 'Comunicación y Mediación', 'Ética y Derechos'] },",
        "{ semestre: 7, cursos: ['Trabajo Social Internacional', 'Gestión de Recursos', 'Sistemas de Protección Social', 'Intervención en Crisis', 'Innovación Social'] },",
        "{ semestre: 8, cursos: ['Seminario de Intervención', 'Trabajo Social y Género', 'Evaluación de Políticas', 'Gestión de la Colaboración', 'Trabajo Social Digital'] },",
        "{ semestre: 9, cursos: ['Trabajo Social en Comunidad', 'Gestión de Casos', 'Liderazgo Social', 'Desarrollo de Proyectos', 'Investigación Aplicada'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Seminario de Investigación Social', 'Ética Profesional', 'Innovación en Acción Social', 'Trabajo Social Sostenible'] }"
    ],
    'Antropología': [
        "{ semestre: 1, cursos: ['Antropología General', 'Etnografía', 'Antropología Urbana', 'Cultura y Poder', 'Historia Cultural'] },",
        "{ semestre: 2, cursos: ['Cultura y Poder', 'Antropología Visual', 'Lingüística Antropológica', 'Antropología del Género', 'Antropología Económica'] },",
        "{ semestre: 3, cursos: ['Antropología del Trabajo', 'Mundo Indígena', 'Teoría Antropológica', 'Antropología de la Religión', 'Investigación de Campo'] },",
        "{ semestre: 4, cursos: ['Antropología Social', 'Antropología Política', 'Globalización', 'Medios y Cultura', 'Etnografía Avanzada'] },",
        "{ semestre: 5, cursos: ['Antropología de la Salud', 'Migración', 'Derechos Humanos', 'Antropología del Cuerpo', 'Cultura Popular'] },",
        "{ semestre: 6, cursos: ['Antropología del Desarrollo', 'Antropología Digital', 'Investigación Interdisciplinaria', 'Trabajo de Campo', 'Seminario de Investigación'] },",
        "{ semestre: 7, cursos: ['Antropología Económica Avanzada', 'Antropología Urbana Avanzada', 'Análisis Cultural', 'Métodos Cualitativos Avanzados', 'Gestión Cultural'] },",
        "{ semestre: 8, cursos: ['Antropología de la Educación', 'Políticas Culturales', 'Seminario de Investigación', 'Antropología del Género Avanzada', 'Antropología Global'] },",
        "{ semestre: 9, cursos: ['Trabajo de Campo Avanzado', 'Investigación Aplicada', 'Ética en Antropología', 'Seminario de Tesis', 'Comunicación Social'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Seminario de Investigación Antropológica', 'Diseño de Proyectos', 'Cultura y Desarrollo', 'Antropología Crítica'] }"
    ],
    'Ciencia Política': [
        "{ semestre: 1, cursos: ['Teoría Política', 'Sistemas Políticos', 'Relaciones Internacionales', 'Política Comparada', 'Análisis de Políticas'] },",
        "{ semestre: 2, cursos: ['Políticas Públicas', 'Sociología Política', 'Derecho Constitucional', 'Gobierno y Estado', 'Economía Política'] },",
        "{ semestre: 3, cursos: ['Política Internacional', 'Estudios Electorales', 'Política Pública Comparada', 'Ética Política', 'Administración Pública'] },",
        "{ semestre: 4, cursos: ['Gestión de Políticas Públicas', 'Derechos Humanos', 'Medios y Política', 'Liderazgo Político', 'Investigación en Ciencias Políticas'] },",
        "{ semestre: 5, cursos: ['Política Ambiental', 'Diplomacia', 'Gobernanza', 'Estructura del Estado', 'Política y Sociedad'] },",
        "{ semestre: 6, cursos: ['Política Regional', 'Seguridad Internacional', 'Gestion de Crisis', 'Análisis Comparado', 'Gestión de Programas'] },",
        "{ semestre: 7, cursos: ['Políticas Públicas Avanzadas', 'Gestión del Cambio', 'Seminario de Investigación', 'Políticas de Desarrollo', 'Consultoría Política'] },",
        "{ semestre: 8, cursos: ['Gobernanza Global', 'Derecho Internacional', 'Política Económica Avanzada', 'Evaluación de Políticas', 'Comunicación Política'] },",
        "{ semestre: 9, cursos: ['Trabajo de Campo', 'Gestión Pública Avanzada', 'Ética y Liderazgo', 'Política Comparada Avanzada', 'Seminario de Tesis'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Seminario de Investigación', 'Desarrollo Político', 'Análisis de Seguridad', 'Gestión de Proyectos Públicos'] }"
    ],
    'Comunicación Social': [
        "{ semestre: 1, cursos: ['Teoría de la Comunicación', 'Comunicación Estratégica', 'Medios Digitales', 'Redacción Creativa', 'Investigación de Audiencias'] },",
        "{ semestre: 2, cursos: ['Investigación de Audiencias', 'Producción de Contenido', 'Marketing de Contenidos', 'Comunicación Organizacional', 'Narrativas Digitales'] },",
        "{ semestre: 3, cursos: ['Relaciones Públicas', 'Publicidad', 'Comunicación Política', 'Medios Audiovisuales', 'Estrategias Digitales'] },",
        "{ semestre: 4, cursos: ['Comunicación Corporativa', 'Periodismo Digital', 'Diseño de Contenido', 'Gestión de Marca', 'Producción Multimedia'] },",
        "{ semestre: 5, cursos: ['Marketing Digital', 'Gestión de Redes Sociales', 'Comunicación Intercultural', 'Branding', 'Investigación de Medios'] },",
        "{ semestre: 6, cursos: ['Comunicación Estratégica Avanzada', 'Planificación de Medios', 'Comunicación de Crisis', 'Creatividad Publicitaria', 'Narrativa Audiovisual'] },",
        "{ semestre: 7, cursos: ['Marketing de Contenido Avanzado', 'Gestión de Públicos', 'Comunicación Web', 'Producción de Campañas', 'Ética en Comunicación'] },",
        "{ semestre: 8, cursos: ['Investigación de Audiencias Avanzada', 'Comunicación de Marca', 'Periodismo Multiplataforma', 'Gestión de Proyectos de Comunicación', 'Seminario de Investigación'] },",
        "{ semestre: 9, cursos: ['Comunicación Digital', 'Comunicación Organizacional Avanzada', 'Estrategias de Marca', 'Gestión de Contenido', 'Seminario Profesional'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Seminario de Investigación', 'Portafolio Profesional', 'Innovación en Comunicación', 'Gestión de Marca Avanzada'] }"
    ],
    'Periodismo': [
        "{ semestre: 1, cursos: ['Redacción Periodística', 'Reportaje', 'Ética Periodística', 'Historia del Periodismo', 'Fotografía Periodística'] },",
        "{ semestre: 2, cursos: ['Periodismo Digital', 'Taller de Noticias', 'Entrevista Periodística', 'Medios Audiovisuales', 'Investigación de Campo'] },",
        "{ semestre: 3, cursos: ['Periodismo de Investigación', 'Narrativa Multimedia', 'Derecho de los Medios', 'Redacción Creativa', 'Cobertura de Eventos'] },",
        "{ semestre: 4, cursos: ['Producción de Programas', 'Comunicación Política', 'Periodismo en Línea', 'Desarrollo de Contenidos', 'Gestión Editorial'] },",
        "{ semestre: 5, cursos: ['Periodismo Internacional', 'Periodismo Deportivo', 'Seminario de Reportaje', 'Edición y Diseño', 'Comunicación Multiplataforma'] },",
        "{ semestre: 6, cursos: ['Periodismo de Datos', 'Investigación Periodística Avanzada', 'Medios Digitales Avanzados', 'Documental Periodístico', 'Comunicación de Crisis'] },",
        "{ semestre: 7, cursos: ['Tecnologías de la Información', 'Entrevista Avanzada', 'Periodismo Narrativo', 'Ética y Leyes', 'Producción Multimedia'] },",
        "{ semestre: 8, cursos: ['Periodismo de Opinión', 'Periodismo Cultural', 'Cobertura Especializada', 'Herramientas Digitales', 'Seminario de Investigación'] },",
        "{ semestre: 9, cursos: ['Portafolio Periodístico', 'Publicación Digital', 'Seminario Profesional', 'Investigación de Audiencias', 'Periodismo Independiente'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Proyecto de Periodismo', 'Investigación en Medios', 'Gestión de Contenidos', 'Comunicación Estratégica'] }"
    ],
    'Publicidad y Relaciones Públicas': [
        "{ semestre: 1, cursos: ['Creatividad Publicitaria', 'Estrategia de Marca', 'Planificación de Medios', 'Psicología del Consumidor', 'Diseño de Campañas'] },",
        "{ semestre: 2, cursos: ['Comunicación Corporativa', 'Marketing Digital', 'Relaciones Públicas', 'Producción Publicitaria', 'Gestión de Marca'] },",
        "{ semestre: 3, cursos: ['Investigación de Mercados', 'Marketing de Contenidos', 'Comunicación de Crisis', 'Gestión de Eventos', 'Publicidad Digital'] },",
        "{ semestre: 4, cursos: ['Branding', 'Estrategias Publicitarias', 'Diseño Creativo', 'Gestión de Reputación', 'Neuromarketing'] },",
        "{ semestre: 5, cursos: ['Comunicación Corporativa Avanzada', 'Relaciones Públicas Internacionales', 'Publicidad Digital Avanzada', 'Marketing de Influencers', 'Gestión de Audiencias'] },",
        "{ semestre: 6, cursos: ['Producción de Campañas Publicitarias', 'Gestión de Proyectos', 'Comunicación Interna', 'Ética en Publicidad', 'Seminario Profesional'] },",
        "{ semestre: 7, cursos: ['Marketing de Marca', 'Comunicación Estratégica Avanzada', 'Gestión de Medios', 'Producción Audiovisual', 'Investigación Aplicada'] },",
        "{ semestre: 8, cursos: ['Planificación de Comunicación', 'Relaciones Públicas Digitales', 'Publicidad Creativa', 'Gestión de Contenidos', 'Evaluación de Campañas'] },",
        "{ semestre: 9, cursos: ['Portafolio Profesional', 'Gestión de Marca Avanzada', 'Asuntos Corporativos', 'Ética y Regulaciones', 'Seminario de Investigación'] },",
        "{ semestre: 10, cursos: ['Trabajo de Grado', 'Proyecto de Comunicación', 'Innovación en Publicidad', 'Seminario de Investigación', 'Gestión Estratégica'] }"
    ]
}

for career, lines in replacements.items():
    pattern = re.compile(r"(\{\s*nombre:\s*'%s'\s*,[\s\S]*?pensum:\s*\[)([\s\S]*?)(\]\s*\n\s*\})" % re.escape(career), re.MULTILINE)
    match = pattern.search(text)
    if not match:
        raise ValueError(f"No match for {career}")
    replacement = match.group(1) + '\n          ' + '\n          '.join(lines) + '\n        ' + match.group(3)
    text = text[:match.start()] + replacement + text[match.end():]

file_path.write_text(text, encoding='utf-8')
print('updated', len(replacements), 'careers')
