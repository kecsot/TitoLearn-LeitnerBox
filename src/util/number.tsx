


export const nth = (n: number) => ["st","nd","rd"][((n+90)%100-10)%10-1]||"th"