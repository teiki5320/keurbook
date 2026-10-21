/**
 * « Le livre en détail » des fiches livre et BD : un fichier par lot de 50 fiches dans analyses/,
 * pour que plusieurs rédacteurs travaillent en parallèle sans se gêner. Règles : docs/ANALYSES.md.
 */
import type { BookAnalysis } from "../types";
import { analyses as l01 } from "./analyses/lot-01";
import { analyses as l02 } from "./analyses/lot-02";
import { analyses as l03 } from "./analyses/lot-03";
import { analyses as l04 } from "./analyses/lot-04";
import { analyses as l05 } from "./analyses/lot-05";
import { analyses as l06 } from "./analyses/lot-06";
import { analyses as l07 } from "./analyses/lot-07";
import { analyses as l08 } from "./analyses/lot-08";
import { analyses as l09 } from "./analyses/lot-09";
import { analyses as l10 } from "./analyses/lot-10";
import { analyses as l11 } from "./analyses/lot-11";
import { analyses as l12 } from "./analyses/lot-12";
import { analyses as l13 } from "./analyses/lot-13";
import { analyses as l14 } from "./analyses/lot-14";
import { analyses as l15 } from "./analyses/lot-15";
import { analyses as l16 } from "./analyses/lot-16";

/** Par slug de livre ou de BD. */
export const BOOK_ANALYSES: Record<string, BookAnalysis> = Object.assign({}, l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16);
