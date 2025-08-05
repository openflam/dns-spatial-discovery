// This zone file would be India's nameserver

export const INDIA_NS_ZONEFILE = `
; Zone: 1.loc.
; Exported  (yyyy-mm-ddThh:mm:ss.sssZ): 2025-08-05T20:21:09.993Z

$ORIGIN 1.loc.
$TTL 120

; SOA Record
@	 		IN	SOA	india-ns.gov.in.	dns-admis.india-ns.gov.in.	(
1754425269	 ;serial
12h	 ;refresh
15m	 ;retry
3w	 ;expire
2h	 ;minimum ttl
)

; NS Records
@	IN	NS	india-ns.gov.in.

; TXT Records
U.1.2.3.2	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.2.2.3.2	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.2.3.2	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.0.2.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.2.2.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.2.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.0.3.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.2.0.2.3.2	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.2.2.2.2.2.2.2.0.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.0.2.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.1.3.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.2.3.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.3.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.1.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.3.2.1.2.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.1.2.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.0.0.2.3.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.0.0.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.1.0.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.2.0.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.2.0.3.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.1.1.1.0.2	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.1.3.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.3.0.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.1.1.1.1.2.1.1.0.2	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
U.3.3.1.1.3	IN	TXT	type@MCNAME#data@india-mapserver.gov.in
`;
