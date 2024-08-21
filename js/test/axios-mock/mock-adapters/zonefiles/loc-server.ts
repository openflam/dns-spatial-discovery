// This zone file would be at the top 'loc' server

export const CMU_NS_ZONEFILE = `
; Zone: 0.1.2.3.1.2.2.1.0.0.1.4.loc.
; Exported  (yyyy-mm-ddThh:mm:ss.sssZ): 2024-07-23T22:51:53.803Z

$ORIGIN 0.1.2.3.1.2.2.1.0.0.1.4.loc.
$TTL 120

; SOA Record
@	 		IN	SOA	loc-nameserver.net.	dns-admin.loc-nameserver.net	(
1721775113	 ;serial
12h	 ;refresh
15m	 ;retry
3w	 ;expire
2h	 ;minimum ttl
)

; NS Records
@	IN	NS	loc-nameserver.net.

; TXT Records
3.1.3.3.0	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
0.0.0.0.1.3.3.3.0	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
1.0.0.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
2.3.3.0	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
3.0.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
0.0.1.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
2.1.3.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
1.2.3.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
0.3.3.3.0	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
2.0.0.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
2.1.0.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
3.1.0.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
1.0.1.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
2.2.2.2.2.3.1.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
1.1.1.0.3.0	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
2.1.3.3.0	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
2.0.0.1	IN	TXT	type@MNS#data@cmu-nameserver.cmu.edu.
`