# DNS Spatial discovery
Uses the DNS to discover localization servers near a GPS location. This repository provides implementations in Python and Javascript. Each repository has its own README with instructions on installation and testing.

## Features implemented

| Feature                | js                 | Python             |
| ---------------------- | ------------------ | ------------------ |
| Location to geodomain  | :white_check_mark: | :white_check_mark: |
| Geodomain DNS query    | :white_check_mark: | :white_check_mark: |
| DNS Cache              | :white_check_mark: | :white_check_mark: |
| DNS query depth        | :x:                | :x:                |
| TXT record unwrapping  | :white_check_mark: | :x:                |
| Name-based fitering    | :white_check_mark: | :x:                |
| NS record chasing      | :white_check_mark: | :x:                |
| Name-based priority    | :x:                | :x:                |
| Map server negotiation | :white_check_mark: | :x:                |
| Localization           | :white_check_mark: | :x:                |
| Parallel DNS lookups   | :white_check_mark: | :x:                |
