interface PensumSemestreRaw { semestre: number; cursos: string[] }
interface CarreraRaw { nombre: string; pensum: PensumSemestreRaw[]; imagen?: string; perfilEgreso?: string; campoLaboral?: string[]; beneficios?: string[] }
interface FacultadRaw { nombre: string; tag: string; color: string; imagen: string; imagenCarrera?: string; carreras: CarreraRaw[] }

interface Curso { codigo: string; nombre: string }
interface PensumSemestre { semestre: number; cursos: Curso[] }
interface Carrera { nombre: string; pensum: PensumSemestre[]; imagen?: string; perfilEgreso: string; campoLaboral: string[]; beneficios: string[] }
interface Facultad { nombre: string; tag: string; color: string; imagen: string; imagenCarrera?: string; carreras: Carrera[] }

let nextCodigoCurso = 1;
function crearCursoConCodigo(nombre: string): Curso {
	const codigo = `C${nextCodigoCurso.toString().padStart(3, '0')}`;
	nextCodigoCurso += 1;
	return { codigo, nombre };
}

function convertirPensumRaw(pensum: PensumSemestreRaw[]): PensumSemestre[] {
	return pensum.map((semestre) => ({ semestre: semestre.semestre, cursos: semestre.cursos.map(crearCursoConCodigo) }));
}

function crearFacultadesConCodigo(facultadesRaw: FacultadRaw[]): Facultad[] {
	return facultadesRaw.map((facultad) => ({
		...facultad,
		carreras: facultad.carreras.map((carrera) => ({
			...carrera,
			pensum: convertirPensumRaw(carrera.pensum),
			perfilEgreso: carrera.perfilEgreso || 'Egresado con competencias técnicas y actitud emprendedora para resolver retos profesionales.',
			campoLaboral: carrera.campoLaboral || [],
			beneficios: carrera.beneficios || []
		}))
	}));
}

// WARNING: The full FACULTADES_RAW dataset is large. For now we export an empty list to avoid circular runtime dependencies.
export const FACULTADES: Facultad[] = [];
