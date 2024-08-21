// This zone file would be at CMU's nameserver

export const CIC_CNAMES_ZONEFILE = `
; Zone: 2.2.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.
; Exported  (yyyy-mm-ddThh:mm:ss.sssZ): 2024-07-23T22:53:48.686Z

$ORIGIN 2.2.0.0.1.0.1.2.3.1.2.2.1.0.0.1.4.loc.
$TTL 120

; SOA Record
@	 		IN	SOA	cmu-nameserver.cmu.edu.	dns-admin.cmu-nameserver.cmu.edu.	(
1721775228	 ;serial
12h	 ;refresh
15m	 ;retry
3w	 ;expire
2h	 ;minimum ttl
)

; NS Records
@	IN	NS	cmu-nameserver.cmu.edu.

; TXT Records
0.3.0	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
1.3.0	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
1.0.1	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
2.0.1	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
3.1	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
0.2	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
1.3	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
2.0	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu

0.3.0	IN	TXT	type@MCNAME#data@cubicles-maps.com
1.3.0	IN	TXT	type@MCNAME#data@cubicles-maps.com
1.0.1	IN	TXT	type@MCNAME#data@cubicles-maps.com
2.0.1	IN	TXT	type@MCNAME#data@cubicles-maps.com
3.1	IN	TXT	type@MCNAME#data@cubicles-maps.com
0.2	IN	TXT	type@MCNAME#data@cubicles-maps.com
1.3	IN	TXT	type@MCNAME#data@cubicles-maps.com
2.0	IN	TXT	type@MCNAME#data@cubicles-maps.com

0.3.0	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
1.3.0	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
1.0.1	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
2.0.1	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
3.1	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
0.2	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
1.3	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
2.0	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu

0.3.0	IN	TXT	type@MCNAME#data@passageway-2300.com
1.3.0	IN	TXT	type@MCNAME#data@passageway-2300.com
1.0.1	IN	TXT	type@MCNAME#data@passageway-2300.com
2.0.1	IN	TXT	type@MCNAME#data@passageway-2300.com
3.1	IN	TXT	type@MCNAME#data@passageway-2300.com
0.2	IN	TXT	type@MCNAME#data@passageway-2300.com
1.3	IN	TXT	type@MCNAME#data@passageway-2300.com
2.0	IN	TXT	type@MCNAME#data@passageway-2300.com
`