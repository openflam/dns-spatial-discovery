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
U.0.3.0	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
U.1.3.0	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
U.1.0.1	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
U.2.0.1	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
U.3.1	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
U.0.2	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
U.1.3	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu
U.2.0	IN	TXT	type@MCNAME#data@arena-2300.cmu.edu

U.0.3.0	IN	TXT	type@MCNAME#data@cubicles-maps.com
U.1.3.0	IN	TXT	type@MCNAME#data@cubicles-maps.com
U.1.0.1	IN	TXT	type@MCNAME#data@cubicles-maps.com
U.2.0.1	IN	TXT	type@MCNAME#data@cubicles-maps.com
U.3.1	IN	TXT	type@MCNAME#data@cubicles-maps.com
U.0.2	IN	TXT	type@MCNAME#data@cubicles-maps.com
U.1.3	IN	TXT	type@MCNAME#data@cubicles-maps.com
U.2.0	IN	TXT	type@MCNAME#data@cubicles-maps.com

U.0.3.0	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
U.1.3.0	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
U.1.0.1	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
U.2.0.1	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
U.3.1	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
U.0.2	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
U.1.3	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu
U.2.0	IN	TXT	type@MCNAME#data@lobby-2300.cmu.edu

U.0.3.0	IN	TXT	type@MCNAME#data@passageway-2300.com
U.1.3.0	IN	TXT	type@MCNAME#data@passageway-2300.com
U.1.0.1	IN	TXT	type@MCNAME#data@passageway-2300.com
U.2.0.1	IN	TXT	type@MCNAME#data@passageway-2300.com
U.3.1	IN	TXT	type@MCNAME#data@passageway-2300.com
U.0.2	IN	TXT	type@MCNAME#data@passageway-2300.com
U.1.3	IN	TXT	type@MCNAME#data@passageway-2300.com
U.2.0	IN	TXT	type@MCNAME#data@passageway-2300.com

7.0.3.0	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
7.1.3.0	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
7.1.0.1	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
7.2.0.1	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
7.3.1	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
7.0.2	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
7.1.3	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
7.2.0	IN	TXT	type@MCNAME#data@known-altitude-map.cmu.edu
`